import { fs } from "@sys";
const sidebar = document.$("#sidebar")!;
const studio = document.$("#studio")!;
const vid = (document.$("video") as any);

Window.this.minSize = [800, 500];

let out = fs.$readdir("Y:/ReLive Videos/Videos");

for (let { name, type } of out.filter(x => x.type == 1).slice(0, 20)) {
    sidebar.append(
        <div class="file entry" data-filename={name}>
            <a>{name}</a>
        </div>
    );
}

// sidebar.on("click", (evt) => {
//     console.log("click")
// })
// sidebar.on("mousedown", (evt) => {
//     console.log("mousedown")
// })

vid.on("start", ()=>{
    console.log("start")
    vid.style.border = "2px solid green"
})
vid.on("stop", ()=>{
    console.log("stop")
    vid.style.border = "2px solid red"
})

sidebar.on("click", ".file.entry", (evt, matched) => {
    if (!matched) {
        console.log("Clicked unknown")
        return;
    }
    vid.video.unload();
    setTimeout(()=>{
        vid.video.load("Y:/ReLive Videos/Videos/" + matched.getAttribute("data-filename"))
        vid.video.play();
        console.log([vid.video.width, vid.video.height])
    }, 0)
})

studio.on("click", "video", (evt, matched) => {
    if (vid.video.isPlaying) {
        vid.video.stop();
    } else {
        vid.video.play();
    }
})