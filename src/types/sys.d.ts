type FileOpenFlags = "a" | "ax" | "a+" | "as" | "as+" | "r" | "r+" | "rs+" | "w" | "wx" | "w+" | "wx+";
/** type 1: file ; type 2: folder */
type FoundObject = { name: string, type: number }
declare module "@sys" {
    export const fs:{
        open(path: string, flags: FileOpenFlags, mode?: number): Promise<File>;
        $open(path: string, flags: FileOpenFlags, mode?: number): File;
        stat(path: string); // complex return type - TODO ... v
        lstat(path: string): Promise<any>;
        $lstat(path: string); // ... ^
        realpath(...args);
        unlink(path: string): Promise<void>;
        rename(oldPath: string, newPath: string): Promise<void>;
        mkdtemp(template: string): Promise<string>;
        mkstemp(template: string): Promise<string>;
        rmdir(path: string): Promise<void>;
        $rmdir(path: string): void;
        mkdir(path: string, mode?): Promise<void>;
        copyfile(...args): Promise<unknown>; // Dammit fix your docs!
        readdir(...args): Promise<FoundObject[]>;
        $readdir(...args): FoundObject[];
        readfile(...args): unknown;
        $readfile(...args): ArrayBuffer;
        watch(path: string, callback: (path: string, events: number) => void): WatchFS;
        splitpath(path: string): [dirpath: string, file: string];
    };
    export function spawn(...args): Process;
    export function hrtime(...args);
    export function gettimeofday(...args);
    export function uname(...args);
    export function isatty(...args);
    export function environ(...args);
    export function getenv(...args);
    export function setenv(...args);
    export function unsetenv(...args);
    export function cwd(...args);
    export function homedir(...args);
    export function tmpdir(...args);
    export function exepath(...args);
    export function random(...args);
}

interface WatchFS {
    readonly path: string;
    close();
}

type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;
interface File {
    path: string;
    read(length?: number, position?: number): Promise<Uint8Array>;
    $read(length?: number, position?: number): Uint8Array;
    write(data: string | TypedArray | ArrayBuffer, position: number): Promise<number>;
    $write(data: string | TypedArray | ArrayBuffer, position: number): number;
    close(): Promise<void>;
    $close(): void;
    fileno(): number;
    stat(): Promise<any>;
}

interface Dir extends AsyncIterator {
    path: string;
    close();
    next();
}

interface TCP {
    close(...args);
    read(...args);
    write(...args);
    shutdown(...args);
    fileno(...args);
    listen(...args);
    accept(...args);
    getsockname(...args);
    getpeername(...args);
    connect(...args);
    bind(...args);
}
interface UDP {
    close(...args);
    recv(...args);
    send(...args);
    fileno(...args);
    getsocketname(...args);
    getpeername(...args);
    connect(...args);
    bind(...args);
}
interface Pipe {
    close(...args);
    read(...args);
    write(...args);
    fileno(...args);
    listen(...args);
    accept(...args);
    getsockname(...args);
    getpeername(...args);
    connect(...args);
    bind(...args);
}
interface TTY {
    close(...args);
    read(...args);
    write(...args);
    fileno(...args);
    setMode(...args);
    getWinSize(...args);
}

interface Process {
    kill(...args);
    wait(...args);
    pid;
    stdin;
    stdout;
    stderr;
}