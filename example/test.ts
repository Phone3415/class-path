import { Path, PathWin32, PathPosix, ObjectPath } from "class-path";

function usePath(p: ObjectPath): void {
  //log path
  console.log("Path:", p.toString());

  if (p.isFile()) {
    console.log("It's a file:", p.readFile());
  }
}

const filePath: Path = new Path("./example-folder/file.txt");

//สร้าง Directory ถ้าไม่มี
filePath.dirname.createIfNotExists();
filePath.writeFile("Hello from TS!");

const resolved = filePath.resolve();
usePath(resolved);

//ใช้งาน Win32
const winPath = new PathWin32("C:\\temp\\test.txt");
console.log("Win path basename:", winPath.basename());

//ใช้งาน Posix
const posixPath = new PathPosix("/var/log/../tmp/test.log");
console.log("POSIX dirname:", posixPath.dirname.toString());
