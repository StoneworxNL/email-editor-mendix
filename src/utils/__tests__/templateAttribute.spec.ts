import { EditableValue, ValueStatus } from "mendix";
import { canWriteTemplate } from "../templateAttribute";

function attribute(status: ValueStatus, readOnly = false): EditableValue<string> {
    return { status, readOnly } as EditableValue<string>;
}

describe("canWriteTemplate", () => {
    it("allows an available, editable attribute whose value was read", () => {
        expect(canWriteTemplate(attribute(ValueStatus.Available), undefined)).toBe(true);
    });

    it("refuses when the stored value could not be read", () => {
        expect(canWriteTemplate(attribute(ValueStatus.Available), "The saved template could not be read")).toBe(false);
    });

    it.each([ValueStatus.Loading, ValueStatus.Unavailable])("refuses a %s attribute", status => {
        expect(canWriteTemplate(attribute(status), undefined)).toBe(false);
    });

    it("refuses a read-only attribute", () => {
        expect(canWriteTemplate(attribute(ValueStatus.Available, true), undefined)).toBe(false);
    });
});
