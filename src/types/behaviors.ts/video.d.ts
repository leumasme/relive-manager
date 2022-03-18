interface VideoBehavior {
    // Attributes are readonly i think?
    readonly src: string;
    readonly sizing: "cover" | "contain";

    // Properties
    readonly isPlaying: boolean;
    readonly isEnded: boolean;
    /** Float, in seconds */
    readonly duration: number;
    /** Float, Current playback progress in seconds */
    position: number;
    readonly height: number;
    readonly width: number;
    readonly renderingBox: [x: number, y: number, width: number, height: number];
    /** 0..1 */
    audioVolume: number;
    /** -1..1, Current stereo balance */
    audioBalance: number;

    load(movieUrl: string): boolean;
    unload();
    play();
    stop();
}