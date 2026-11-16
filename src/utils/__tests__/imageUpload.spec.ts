import { Editor } from "../editorOptions";
import { registerImageUpload } from "../imageUpload";

type Done = jest.Mock<void, [object]>;
type Upload = (file: { attachments: File[] }, done: Done) => void;

function register(): Upload {
    const editor = { registerCallback: jest.fn() };
    registerImageUpload(editor as unknown as Editor, "rest/images");
    expect(editor.registerCallback).toHaveBeenCalledWith("image", expect.any(Function));
    return editor.registerCallback.mock.calls[0][1];
}

function respond(response: Partial<Response>): jest.Mock {
    const fetchMock = jest.fn().mockResolvedValue(response);
    global.fetch = fetchMock as unknown as typeof fetch;
    return fetchMock;
}

/** Let the fetch promise chain settle. */
const settle = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0));

const image = new File(["png"], "logo.png", { type: "image/png" });

afterEach(() => {
    delete window.mx;
});

describe("registerImageUpload", () => {
    it("posts the image with the CSRF token and reports the returned URL", async () => {
        window.mx = { session: { getConfig: (key: string) => (key === "csrftoken" ? "token-1" : undefined) } };
        const fetchMock = respond({ ok: true, json: () => Promise.resolve({ url: "https://app/img/logo.png" }) });
        const done: Done = jest.fn();

        register()({ attachments: [image] }, done);
        await settle();

        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe("rest/images");
        expect(init.method).toBe("POST");
        expect(init.headers["X-Csrf-Token"]).toBe("token-1");
        expect((init.body as FormData).get("file")).toBe(image);
        expect(done).toHaveBeenLastCalledWith({ progress: 100, url: "https://app/img/logo.png" });
    });

    it("reports an HTTP error", async () => {
        respond({ ok: false, status: 403 });
        const done: Done = jest.fn();
        jest.spyOn(console, "error").mockImplementation(() => undefined);

        register()({ attachments: [image] }, done);
        await settle();

        expect(done).toHaveBeenLastCalledWith({ error: "Upload failed with HTTP 403" });
    });

    it("reports a response without a URL", async () => {
        respond({ ok: true, json: () => Promise.resolve({}) });
        const done: Done = jest.fn();
        jest.spyOn(console, "error").mockImplementation(() => undefined);

        register()({ attachments: [image] }, done);
        await settle();

        expect(done).toHaveBeenLastCalledWith({ error: 'Upload response has no "url"' });
    });

    it("aborts when there is no file", () => {
        const done: Done = jest.fn();
        register()({ attachments: [] }, done);
        expect(done).toHaveBeenCalledWith({ abort: true });
    });
});
