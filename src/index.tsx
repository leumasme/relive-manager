import { getenv } from "@sys";
import { Database } from "./database";
import { App } from "./app";

Window.this.minSize = [800, 500];

try {
    let path = getenv("APPDATA") + "/relive_manager";
    const db = new Database(path);
    console.log("Loaded database!");


    db.catchup("Y:/ReLive Videos/Videos")
    console.log("Caught up to folder!");

    document.body.patch(<App db={db} />);

    document.on("unload", ()=>{
        db.storage.close();
    })
} catch (e: any) {
    document.body.content(<a>Failed to initialize app! {e.toString()}</a>)
}