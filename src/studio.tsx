export class Studio extends Element {
    render() {
        return <div id="studio">
            <div id="video-container">
                <video></video>
                <div class="video-controls">
                    <input type="hslider" min={0} max={1000} />
                </div>
            </div>
            <div id="current-tags" class="vertical">
                <input type="text" id="add-tag" />
            </div>
            <div>
                <a>Buttons here!</a>
            </div>
        </div>
    }
    loadVideo(path: string) {
        let vid = (this.$("video") as any).video as VideoBehavior;
        vid.unload();
        setTimeout(() => {
            vid.load(path);
            console.log("Loaded video.")
            vid.play();
        }, 0);
    }
    ["on start at video"](evt: Event, elem: Element) {
        elem.style.border = "2px solid green"
    }
    ["on stop at video"](evt: Event, elem: Element) {
        elem.style.border = "2px solid red"
    }
    ["on click at video"](evt: Event, elem: Element) {
        let vid = (elem as any).video as VideoBehavior;
        if (vid.isPlaying) {
            vid.stop();
        } else {
            vid.play();
        }
    }
}