import { getenv } from "@sys";
import { Database } from "./database";
import { Sidebar } from "./sidebar";
var sidebar = document.$("#sidebar")!;
const studio = document.$("#studio")!;
const vid = (document.$("video") as any);

Window.this.minSize = [800, 500];

let path = getenv("APPDATA") + "/relive_manager";
const db = new Database(path);
console.log("Loaded database!");


db.catchup("Y:/ReLive Videos/Videos")
console.log("Caught up to folder!");

sidebar = sidebar.patch(
    <Sidebar db={db} video={vid.video} />
);

vid.on("start", () => {
    console.log("start")
    vid.style.border = "2px solid green"
});
vid.on("stop", () => {
    console.log("stop")
    vid.style.border = "2px solid red"
});

studio.on("click", "video", (evt, matched) => {
    if (vid.video.isPlaying) {
        vid.video.stop();
    } else {
        vid.video.play();
    }
})