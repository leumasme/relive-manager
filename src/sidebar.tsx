import { Database } from "./database";

export class Sidebar extends Element {
    db: Database;
    video: any;
    constructor(props: Record<string, any>, kids: VNode[]) {
        super();
        this.db = props.db;
        this.video = props.video;
    }
    render() {
        return <div id="sidebar">
            {this.db.data.videos.map(vid =>
                <div class="file entry" data-path={vid.path}>
                    <a>{vid.name}</a>
                </div>
            )}
        </div>
    }
    ["on click at .file.entry"](evt: Event, matched: Element) {
        console.log("Clicked event yay!")

        this.video.unload();
        // Immediate-Delay load to render unload first
        setTimeout(() => {
            this.video.load(matched.getAttribute("data-path"))
            console.log("Loaded video!");
            this.video.play();
        }, 0)
    }
}