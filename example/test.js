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
