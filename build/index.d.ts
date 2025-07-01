import path from "node:path";
import fs from "node:fs";
export type ObjectPath = Path | PathWin32 | PathPosix;
type PathTypes = ObjectPath | string;
type Sep = "\\" | "/";
type Delimiter = ";" | ":";
declare abstract class PathWrapper {
    backend: path.PlatformPath;
    protected static backend: path.PlatformPath;
    Constructor: new (path: string) => this;
    path: string;
    static sep: Sep;
    static delimiter: Delimiter;
    constructor(initPath: string | ObjectPath);
    toString(): string;
    clone(): this;
    join(...joinPaths: PathTypes[]): this;
    resolve(): this;
    normalize(): this;
    isAbsolute(): boolean;
    static relative<T extends PathWrapper>(this: new (path: string) => T, from: PathTypes, to: PathTypes): T;
    toNamespacedPath(): this;
    get dirname(): this;
    basename(suffix?: string): string;
    get extname(): string;
    static format<T extends PathWrapper>(this: new (path: string) => T, pathObject: path.FormatInputPathObject): T;
    parse(): path.FormatInputPathObject;
    matchesGlob(pattern: string): boolean;
    readFile(): string;
    readFileBuffer(): Buffer;
    writeFile(data: string | NodeJS.ArrayBufferView, options?: fs.WriteFileOptions): this;
    isFile(): boolean;
    isDirectory(): boolean;
    makeDirectory(options?: fs.Mode | fs.MakeDirectoryOptions): this;
    exists(): boolean;
    createIfNotExists(): this;
    removeSync(options?: fs.RmOptions): this;
}
export declare class Path extends PathWrapper {
}
export declare class PathWin32 extends PathWrapper {
    backend: path.PlatformPath;
    protected static backend: path.PlatformPath;
    static sep: Sep;
    static delimiter: Delimiter;
}
export declare class PathPosix extends PathWrapper {
    backend: path.PlatformPath;
    protected static backend: path.PlatformPath;
    static sep: Sep;
    static delimiter: Delimiter;
}
declare const _default: {
    Path: typeof Path;
    PathWin32: typeof PathWin32;
    PathPosix: typeof PathPosix;
};
export default _default;
