import { ListExpressionValue, ListValue, ValueStatus } from "mendix";

export type MergeTags = Record<string, { name: string; value: string; sample?: string }>;

/**
 * Turn the merge tag datasource into Unlayer's merge tag map. Returns undefined
 * while the list is loading, so the editor keeps what it has until then.
 */
export function buildMergeTags(
    source: ListValue | undefined,
    name: ListExpressionValue<string> | undefined,
    value: ListExpressionValue<string> | undefined,
    sample: ListExpressionValue<string> | undefined
): MergeTags | undefined {
    if (!source || !name || !value) {
        return undefined;
    }
    if (source.status !== ValueStatus.Available || !source.items) {
        return undefined;
    }
    const tags: MergeTags = {};
    // Keyed by value, so a tag keeps its key when the list is sorted or filtered;
    // a value listed twice is offered once.
    source.items.forEach(item => {
        const tagName = name.get(item).value;
        const tagValue = value.get(item).value;
        if (!tagName || !tagValue) {
            return;
        }
        const tagSample = sample?.get(item).value;
        tags[tagValue] = tagSample
            ? { name: tagName, value: tagValue, sample: tagSample }
            : { name: tagName, value: tagValue };
    });
    return tags;
}
