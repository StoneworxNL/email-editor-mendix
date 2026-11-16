import { ListExpressionValue, ListValue, ObjectItem, ValueStatus } from "mendix";

import { buildMergeTags } from "../mergeTags";

type Row = { name?: string; value?: string; sample?: string };

function list(rows: Row[], status = ValueStatus.Available): ListValue {
    return { status, items: rows.map((_, i) => ({ id: String(i) } as unknown as ObjectItem)) } as ListValue;
}

function column(rows: Row[], key: keyof Row): ListExpressionValue<string> {
    return {
        get: (item: ObjectItem) => ({ value: rows[Number(item.id)][key] })
    } as unknown as ListExpressionValue<string>;
}

function build(rows: Row[], status?: ValueStatus): ReturnType<typeof buildMergeTags> {
    return buildMergeTags(list(rows, status), column(rows, "name"), column(rows, "value"), column(rows, "sample"));
}

describe("buildMergeTags", () => {
    it("keys tags by value, with the sample when there is one", () => {
        expect(
            build([
                { name: "First name", value: "{%FirstName%}", sample: "Ana" },
                { name: "Main text", value: "{%MainText%}" }
            ])
        ).toEqual({
            "{%FirstName%}": { name: "First name", value: "{%FirstName%}", sample: "Ana" },
            "{%MainText%}": { name: "Main text", value: "{%MainText%}" }
        });
    });

    it("keeps the same keys when the list is reordered", () => {
        const rows = [
            { name: "A", value: "{%A%}" },
            { name: "B", value: "{%B%}" }
        ];
        expect(Object.keys(build([...rows].reverse())!).sort()).toEqual(Object.keys(build(rows)!).sort());
    });

    it("skips rows without a name or value", () => {
        expect(build([{ name: "No value" }, { value: "{%NoName%}" }])).toEqual({});
    });

    it("returns undefined while the list is loading, so the editor keeps its tags", () => {
        expect(build([{ name: "A", value: "{%A%}" }], ValueStatus.Loading)).toBeUndefined();
    });

    it("returns undefined when no merge tags are configured", () => {
        expect(buildMergeTags(undefined, undefined, undefined, undefined)).toBeUndefined();
    });
});
