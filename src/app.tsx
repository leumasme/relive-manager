import { Studio } from "./studio";
import { Sidebar } from "./sidebar";
import { Database } from "./database";

export class App extends Element {
    db: Database;
    constructor(props: Record<string, any>, kids: VNode[]) {
        super();
        this.db = props.db;
    }
    render() {
        return <frameset cols="auto, *">
            <Sidebar db={this.db} onElementSelected={this.changeVideo} />
            <splitter />
            <Studio db={this.db} />
        </frameset>
    }
    changeVideo = (path: string) => {
        let studio = this.$("#studio") as Studio;
        studio.loadVideo(path);
    }
}