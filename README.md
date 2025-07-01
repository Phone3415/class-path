# จัดการ Path ใน Node.js ด้วย Classes และ Instances

Library class-path มีไว้สำหรับช่วยจัดการเส้นทางไฟล์ (file path) ได้อย่างมีประสิทธิภาพ ด้วย API ที่เป็นใช้งานง่ายและปลอดภัยผ่าน Class และ Instance — รองรับทั้ง POSIX และ Windows path

 - เขียนขึ้นโดยใช้ Typescript
 - มี Type Safety
 - Method สำหรับจัดการ path และไฟล์ในตัว เช่น readFile, writeFile, isFile, mkdir, ฯลฯ
 - เป็น OOP ทำให้อ่านและใช้งานได้ง่าย
 - Immutable API – ทุก method ที่เปลี่ยน path จะคืนค่า Instance ใหม่ (ปลอดภัยจาก side effect)

## Installation
```sh
npm i class-path
```

## Example

### JavaScript
```js
const { Path, PathWin32, PathPosix } = require("class-path");

const filePath = new Path("./example-folder/file.txt");

// สร้าง Directory ถ้ามันไม่มีอยู่
filePath.dirname.createIfNotExists();

// เขียนไฟล์
filePath.writeFile("Hello World!");

// อ่านไฟล์
const content = filePath.readFile();
console.log("Content:", content); // → Hello World!

// อ่านข้อมูลไฟล์
console.log("Is file:", filePath.isFile());        // → true
console.log("Dirname:", filePath.dirname.toString()); // → example-folder

// Normalize และ resolve
//สามารถใช้ .path แทน .toString() ได้
const joined = filePath.dirname.join("..", "other-folder", "file2.txt");
console.log("Joined:", joined.normalize().resolve().path);

// ใช้งาน POSIX
const posixPath = new PathPosix("/home/user/../test/file.txt");
console.log("POSIX normalized:", posixPath.normalize().toString());

// ใช้งาน Win32
const win32Path = new PathWin32("C:\\Users\\John\\..\\Public\\file.txt");
console.log("Win32 normalized:", win32Path.normalize().path);
```

### Typescript
```ts
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
```
