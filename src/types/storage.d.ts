declare module "@storage" {
    /** @throws null if the path contains non-existing folders */
    export function open(filename: string, allowWrite?: boolean): Storage;
};

type IndexType = "integer" | "long" | "float" | "date" | "string";
interface Storage<T = any> {
    root: T;
    close();
    commit();
    createIndex(type: IndexType, unique?: bool): Index;
}

interface Index extends Iterable {
    readonly length: number;
    readonly unique: boolean;
    readonly type: string;
    set(key, obj, replace?: boolean): boolean;
    get(key);
    delete(key, obj?): boolean;
    select(minKey, maxKey, ascending?, startInclusive?, endInclusive?): Iterator
    clear();
}