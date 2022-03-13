var Event: Event__Static;

interface Event__Static {
    /** @description get pressed state of key */
    keyState(key: string): boolean | undefined;
    new(): Event; // todo: args?
}


declare type AllEvents = MouseEvents | BehaviorEvents | FocusEvents | KeyboardEvents | ScrollEvents | DocumentLoadingEvents
    | DocumentClosingEvents | ElementStateEvents | DragndropEvents | VideoEvents;
declare type MouseEvents = "mousemove" | "mouseenter" | "mouseleave" | "mouseidle" | "mousetick" | "mousedown"
    | "mouseup" | "mousewheel" | "mousedragrequest" | ("dblclick" | "doubleclick") | "tripleclick";
declare type BehaviorEvents = "click" | "input" | "change" | "press" | "changing" | "submit" | "reset" | "expand"
    | "collapse" | "statechange" | "visualstatechange" | "disabledstatechange" | "readonlystatechange" | "contextmenu"
    | "contextmenusetup" | "animationend" | "animationstart" | "animationloop" | "transitionend" | "transitionstart"
    | "mediachange" | "contentchange" | "inputlangchange" | "pastehtml" | "pastetext" | "pasteimage" | "popuprequest"
    | "popupready" | "popupdismissing" | "popupdismissed" | "tooltiprequest";
declare type FocusEvents = "focusin" | "focusout" | "focus" | "blur";
declare type KeyboardEvents = "keydown" | "keyup" | "keypress" | "compositionstart" | "compositionend";
declare type ScrollEvents = "scroll" | "scrollanimationstart" | "scrollanimationend";
// Document Lifecycle Events
declare type DocumentLoadingEvents = "parsed" | ("ready" | "DOMContentLoaded0") | "complete";
declare type DocumentClosingEvents = ("close" | "unload") | "beforeunload" | "closerequest";
declare type ElementStateEvents = "sizechange" | "visibilitychange";
declare type ImageEvents = "load" | "error";
declare type PagerEvents = "paginationstart" | "paginationpage" | "paginationend";
declare type DragndropEvents = "drag" | "dragenter" | "dragleave" | "drop" | "dragcancel" | "dragaccept" | "willacceptdrop";
declare type VideoEvents = "play" | "ended" | "videocoordinate" | "videoframeready";

interface Event {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: null | any;
    defaultPrevented?;
    eventPhase: number;
    target?;
    data?: any;
    /** @description alias of data */
    details?: any;
    keyCode: number;
    platformKeyCode: string;
    code: string;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    button?;
    clientX: number;
    clientY: number;
    screenX: number
    screenY: number;
    windowX: number;
    windowY: number;
    /** @description Mouse wheel delta, float */
    deltaX?: number;
    /** @description Mouse wheel delta, float */
    deltaY?: number;
    deltaMode: number;
    /** @description Relative to currentTarget */
    x: number;
    /** @description Relative to currentTarget */
    y: number;
    source; // may be null
    isOnIcon?; // Element?
    preventDefault();
    stopImmidiatePropagation();
    stopPropagation();
}