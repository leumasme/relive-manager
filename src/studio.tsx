export class Studio extends Element {
    vid?: VideoBehavior;
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
    componentDidMount() {
        this.vid = (this.$("video") as any).video;
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
        if (this.vid!.isPlaying) {
            this.vid!.stop();
        } else {
            this.vid!.play();
        }
    }
    ["on mousedown at input[type=hslider]"](evt: Event, elem: Element) {
        // this.vid!.stop();
        console.log("Down")
    }
    ["on mouseup at input[type=hslider]"](evt: Event, elem: Element) {
        console.log("Up")
        // this.vid!.position = this.vid!.duration * (elem.value / 1000);
        // this.vid!.play();
    }
    ["on change at input[type=hslider]"](evt: Event, elem: Element) {
        this.vid!.stop();
        this.vid!.position = this.vid!.duration * (elem.value / 1000);
    }
    ["on click at input[type=hslider]"](evt: Event, elem: Element) {
        this.vid!.play();
        console.log("Play")
        let listener = ()=>{
            this.vid!.stop();
            console.log("Stoppp")
            this.$("video")!.off(listener);
        }
        this.$("video")!.on("start", listener);
    }
}