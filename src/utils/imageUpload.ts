import { Editor } from "./editorOptions";

type ImageCallback = Parameters<Editor["registerCallback"]>[1];

declare global {
    interface Window {
        mx?: { session?: { getConfig?: (key: string) => unknown } };
    }
}

/** Whether a URL, relative or absolute, points at the app's own origin. */
export function isSameOrigin(url: string): boolean {
    try {
        return new URL(url, window.location.href).origin === window.location.origin;
    } catch {
        return false;
    }
}

/** Whether a URL is absolute and uses http or https. */
function isHttpUrl(url: string): boolean {
    try {
        const { protocol } = new URL(url);
        return protocol === "https:" || protocol === "http:";
    } catch {
        return false;
    }
}

/**
 * Mendix published REST services that use the active session for authentication
 * reject requests without the session's CSRF token. The token is only sent to the
 * app's own origin: an upload URL on another host must never receive it.
 */
function csrfHeaders(uploadUrl: string): Record<string, string> {
    if (!isSameOrigin(uploadUrl)) {
        return {};
    }
    const token = window.mx?.session?.getConfig?.("csrftoken");
    return typeof token === "string" ? { "X-Csrf-Token": token } : {};
}

/**
 * Upload images to the app's own endpoint instead of Unlayer's storage. The
 * endpoint receives multipart/form-data with the image in a part named "file"
 * and must answer with JSON containing the public http(s) "url" of the stored
 * image. Any other URL (javascript:, data: and so on) is refused, because it
 * ends up in the email's HTML.
 */
export function registerImageUpload(editor: Editor, uploadUrl: string): void {
    const upload: ImageCallback = (file: { attachments: File[] }, done: (result: object) => void) => {
        const image = file.attachments[0];
        if (!image) {
            done({ abort: true });
            return;
        }
        const body = new FormData();
        body.append("file", image);

        done({ progress: 10 });
        fetch(uploadUrl, {
            method: "POST",
            credentials: "same-origin",
            headers: { Accept: "application/json", ...csrfHeaders(uploadUrl) },
            body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Upload failed with HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data: { url?: unknown }) => {
                if (typeof data?.url !== "string" || !data.url) {
                    throw new Error('Upload response has no "url"');
                }
                if (!isHttpUrl(data.url)) {
                    throw new Error('Upload response "url" is not an absolute http(s) URL');
                }
                done({ progress: 100, url: data.url });
            })
            .catch((e: Error) => {
                console.error("ReactEmailEditor: image upload failed.", e);
                done({ error: e.message });
            });
    };
    editor.registerCallback("image", upload);
}
