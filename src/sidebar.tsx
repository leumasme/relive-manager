import { Database } from "./database";

export class Sidebar extends Element {
    db: Database;
    video: VideoBehavior;
    onElementSelected: (path: string) => void;
    constructor(props: Record<string, any>, kids: VNode[]) {
        super();
        this.db = props.db;
        this.onElementSelected = props.onElementSelected;
        // this.video = props.video;

        this.video = null as any;
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

        this.onElementSelected(matched.getAttribute("data-path")!);
    }
}