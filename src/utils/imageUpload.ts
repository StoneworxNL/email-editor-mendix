import { Editor } from "./editorOptions";

type ImageCallback = Parameters<Editor["registerCallback"]>[1];

declare global {
    interface Window {
        mx?: { session?: { getConfig?: (key: string) => unknown } };
    }
}

/**
 * Mendix published REST services that use the active session for authentication
 * reject requests without the session's CSRF token.
 */
function csrfHeaders(): Record<string, string> {
    const token = window.mx?.session?.getConfig?.("csrftoken");
    return typeof token === "string" ? { "X-Csrf-Token": token } : {};
}

/**
 * Upload images to the app's own endpoint instead of Unlayer's storage. The
 * endpoint receives multipart/form-data with the image in a part named "file"
 * and must answer with JSON containing the public "url" of the stored image.
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
            headers: { Accept: "application/json", ...csrfHeaders() },
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
                done({ progress: 100, url: data.url });
            })
            .catch((e: Error) => {
                console.error("ReactEmailEditor: image upload failed.", e);
                done({ error: e.message });
            });
    };
    editor.registerCallback("image", upload);
}
