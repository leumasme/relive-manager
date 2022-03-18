import { fs } from "@sys";
import { open } from "@storage";

export type Tag = {
    name: string;
    color: string;
}
export type Action = {
    type: "trim" | "compressToSize",
    args: any[],
}
export type DatabaseRoot = {
    videos: {
        path: string,
        name: string,
        seen: boolean,
        tags: Tag[],
        variations: {
            filename: string,
            name: string,
            actions: Action[]
        }[]
    }[],
    tags: Tag[], // Order here controls tag importance
}
export class Database {
    data: DatabaseRoot;
    constructor(dbpath: string) {
        try { fs.$mkdir(dbpath); } catch { }
        try {
            var storage = open(dbpath + "/storage", true);
        } catch (e: any) {
            console.log("Failed to open storage!", [e], dbpath + "/storage");
            throw "fuck";
        }
        if (!storage.root) {
            storage.root = {
                videos: [], tags: []
            } as DatabaseRoot;
        }

        storage.root.videos; // Preload this element to prevent sciter bug
        window.data = storage.root;
        this.data = storage.root;
    }

    catchup(vidpath: string) {
        let vids = this.deepFindFiles(vidpath);
        for (let path of vids) {
            if (!this.data.videos.find(v => v.path == path)) {
                this.data.videos.push({
                    path: path,
                    name: path.split("/").pop()!,
                    tags: [],
                    variations: [],
                    seen: false
                })
            }
        }
    }
    private deepFindFiles(path: string): string[] {
        let entries = fs.$readdir(path).filter(e => e.type == 2 || e.name.endsWith(".mp4"));
        let files = entries.filter(e => e.type == 1).map(e => path + "/" + e.name);

        let folders = entries.filter(e => e.type == 2);
        let childFiles = folders.map(e => this.deepFindFiles(path + "/" + e.name)).flat()
        return files.concat(childFiles);
    }
}