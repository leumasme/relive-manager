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
    storage: Storage<DatabaseRoot>;
    constructor(dbpath: string) {
        try { fs.$mkdir(dbpath); } catch { }
        try {
            var storage = open(dbpath + "/storage", true);
        } catch (e: any) {
            console.log("Failed to open storage!", [e], dbpath + "/storage");
            throw "storage_failed";
        }
        // console.log(Object.keys(storage.root?.videos))
        if (!storage.root) {
            console.log("Initializing storage for the first time...")
            storage.root = {
                videos: [], tags: []
            } as DatabaseRoot;
        }
        console.log(Object.keys(storage.root).length)

        this.storage = storage;
    }

    catchup(vidpath: string) {
        let vids = this.deepFindFiles(vidpath);
        for (let path of vids) {
            if (!this.storage.root.videos.find(v => v.path == path)) {
                let filename = path.split("/").pop()!;
                console.log("Found new Video! " + filename)
                this.storage.root.videos.push({
                    path: path,
                    name: filename,
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