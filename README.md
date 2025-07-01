# oop-path

> Available in: [English](#english-en) | [ภาษาไทย](#ภาษาไทย-th)

## English (EN)

### Manage File Paths in Node.js with Classes and Instances

oop-path is a utility library designed to simplify and enhance file path manipulation in Node.js using a clean, object-oriented approach. It provides a type-safe, immutable API for working with both POSIX and Windows paths.

- Built with TypeScript
- Full type safety and IDE support
- Includes common path and file methods such as readFile, writeFile, isFile, mkdir, and more
- Uses Classes and Instances for better readability and maintainability
- Immutable API – every method returns a new instance, preventing unexpected side effects

## ภาษาไทย (TH)

### จัดการ Path ใน Node.js ด้วย Classes และ Instances

Library oop-path มีไว้สำหรับช่วยจัดการเส้นทางไฟล์ (file path) ได้อย่างมีประสิทธิภาพ ด้วย API ที่เป็นใช้งานง่ายและปลอดภัยผ่าน Class และ Instance — รองรับทั้ง POSIX และ Windows path

- เขียนขึ้นโดยใช้ Typescript
- มี Type Safety
- Method สำหรับจัดการ path และไฟล์ในตัว เช่น readFile, writeFile, isFile, mkdir, ฯลฯ
- เป็น OOP ทำให้อ่านและใช้งานได้ง่าย
- Immutable API – ทุก method ที่เปลี่ยน path จะคืนค่า Instance ใหม่ (ปลอดภัยจาก side effect)

## Installation

```sh
npm i oop-path
```

## Example

### JavaScript

```js
const { Path, PathWin32, PathPosix } = require("oop-path");

const filePath = new Path("./example-folder/file.txt");

filePath.dirname.createIfNotExists();

// write content to file
filePath.writeFile("Hello World!");

// read file content
const content = filePath.readFile();
console.log("Content:", content); // → Hello World!

console.log("Is file:", filePath.isFile()); // → true
console.log("Dirname:", filePath.dirname.toString()); // → example-folder

// Join, normalize, and resolve
// You can also use `.path` instead of `.toString()`
const joined = filePath.dirname.join("..", "other-folder", "file2.txt");
console.log("Joined:", joined.normalize().resolve().path);

// POSIX usage
const posixPath = new PathPosix("/home/user/../test/file.txt");
console.log("POSIX normalized:", posixPath.normalize().toString());

// Win32 usage
const win32Path = new PathWin32("C:\\Users\\John\\..\\Public\\file.txt");
console.log("Win32 normalized:", win32Path.normalize().path);
```

### Typescript

```ts
import { Path, PathWin32, PathPosix, ObjectPath } from "oop-path";

function usePath(p: ObjectPath): void {
  //logging path
  console.log("Path:", p.toString());

  if (p.isFile()) {
    console.log("It's a file:", p.readFile());
  }
}

const filePath: Path = new Path("./example-folder/file.txt");

filePath.dirname.createIfNotExists();
filePath.writeFile("Hello from TS!");

const resolved = filePath.resolve();
usePath(resolved);

// Win32 usage
const winPath = new PathWin32("C:\\temp\\test.txt");
console.log("Win path basename:", winPath.basename());

// Posix usage
const posixPath = new PathPosix("/var/log/../tmp/test.log");
console.log("POSIX dirname:", posixPath.dirname.toString());
```
