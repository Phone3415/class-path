import path from "node:path";
import * as fs from "node:fs";

export type ObjectPath = Path | PathWin32 | PathPosix;
type PathTypes = ObjectPath | string;

type Sep = "\\" | "/";
type Delimiter = ";" | ":";

function isPathType(input: any): input is ObjectPath {
  return input instanceof PathWrapper;
}

abstract class PathWrapper {
  public backend: path.PlatformPath = path;
  protected static backend: path.PlatformPath = path;

  public Constructor!: new (path: string) => this;

  public path: string;

  public static sep: Sep = path.sep;
  public static delimiter: Delimiter = path.delimiter;

  constructor(initPath: string | ObjectPath) {
    if (isPathType(initPath)) {
      initPath = initPath.path;
    }

    this.path = initPath;

    this.Constructor = this.constructor as new (path: string) => this;
  }

  toString(): string {
    return this.path;
  }

  clone(): this {
    return new this.Constructor(this.path);
  }

  public join(...joinPaths: PathTypes[]): this {
    const stringjoinPaths: string[] = joinPaths.map((joinPath) => {
      if (isPathType(joinPath)) return joinPath.path;

      return joinPath;
    });

    const joinedPath = this.backend.join(this.path, ...stringjoinPaths);

    return new this.Constructor(joinedPath);
  }

  public resolve(): this {
    const resolved_path = this.backend.resolve(this.path);

    return new this.Constructor(resolved_path);
  }

  public normalize(): this {
    const normalized_path = this.backend.normalize(this.path);

    return new this.Constructor(normalized_path);
  }

  public isAbsolute(): boolean {
    return this.backend.isAbsolute(this.path);
  }

  public static relative<T extends PathWrapper>(
    this: new (path: string) => T,
    from: PathTypes,
    to: PathTypes
  ): T {
    if (isPathType(from)) {
      from = from.path;
    }

    if (isPathType(to)) {
      to = to.path;
    }

    const relative: string = (this as any).backend.relative(from, to);

    return new this(relative);
  }

  public toNamespacedPath(): this {
    const namespaced_path: string = this.backend.toNamespacedPath(this.path);

    return new this.Constructor(namespaced_path);
  }

  public get dirname(): this {
    const dirname: string = this.backend.dirname(this.path);

    return new this.Constructor(dirname);
  }

  public basename(suffix?: string): string {
    return this.backend.basename(this.path, suffix);
  }

  public get extname(): string {
    return this.backend.extname(this.path);
  }

  public static format<T extends PathWrapper>(
    this: new (path: string) => T,
    pathObject: path.FormatInputPathObject
  ): T {
    const formatted: string = (this as any).backend.format(pathObject);

    return new this(formatted);
  }

  public parse(): path.FormatInputPathObject {
    return this.backend.parse(this.path);
  }

  public matchesGlob(pattern: string): boolean {
    return this.backend.matchesGlob(this.path, pattern);
  }

  public readFile(): string {
    return this.readFileBuffer().toString();
  }

  public readFileBuffer(): Buffer {
    return fs.readFileSync(this.path);
  }

  public writeFile(
    data: string | NodeJS.ArrayBufferView,
    options?: fs.WriteFileOptions
  ): this {
    fs.writeFileSync(this.path, data, options);

    return this;
  }

  public isFile(): boolean {
    try {
      return fs.statSync(this.path).isFile();
    } catch {
      return false;
    }
  }

  public isDirectory(): boolean {
    try {
      return fs.statSync(this.path).isDirectory();
    } catch {
      return false;
    }
  }

  public makeDirectory(options?: fs.Mode | fs.MakeDirectoryOptions): this {
    fs.mkdirSync(this.path, options);

    return this;
  }

  public exists(): boolean {
    return fs.existsSync(this.path);
  }

  public createIfNotExists(): this {
    if (!this.exists()) {
      fs.mkdirSync(this.path, { recursive: true });
    }
    return this;
  }

  public removeSync(options?: fs.RmOptions): this {
    fs.rmSync(this.path, options);

    return this;
  }
}


export class Path extends PathWrapper {}

export class PathWin32 extends PathWrapper {
  public backend: path.PlatformPath = path.win32;
  protected static backend: path.PlatformPath = path.win32;

  public static sep: Sep = path.win32.sep;
  public static delimiter: Delimiter = path.win32.delimiter;
}

export class PathPosix extends PathWrapper {
  public backend: path.PlatformPath = path.posix;
  protected static backend: path.PlatformPath = path.posix;

  public static sep: Sep = path.posix.sep;
  public static delimiter: Delimiter = path.posix.delimiter;
}

export default { Path, PathWin32, PathPosix };
