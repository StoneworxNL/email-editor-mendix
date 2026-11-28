import { EditableValue, ValueStatus } from "mendix";

/**
 * Whether the editor may write its design to the template attribute.
 *
 * Only when Mendix has the attribute (a loading or unavailable attribute
 * accepts setValue and stores nothing), it is editable, and the stored value
 * was understood. A stored template that failed to load is not in the editor,
 * so writing the editor's content would replace it with whatever is on screen.
 */
export function canWriteTemplate(attribute: EditableValue<string>, loadError: string | undefined): boolean {
    return attribute.status === ValueStatus.Available && !attribute.readOnly && !loadError;
}
