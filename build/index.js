"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathPosix = exports.PathWin32 = exports.Path = void 0;
var node_path_1 = __importDefault(require("node:path"));
var node_fs_1 = __importDefault(require("node:fs"));
function isPathType(input) {
    return input instanceof PathWrapper;
}
var PathWrapper = /** @class */ (function () {
    function PathWrapper(initPath) {
        this.backend = node_path_1.default;
        if (isPathType(initPath)) {
            initPath = initPath.path;
        }
        this.path = initPath;
        this.Constructor = this.constructor;
    }
    PathWrapper.prototype.toString = function () {
        return this.path;
    };
    PathWrapper.prototype.clone = function () {
        return new this.Constructor(this.path);
    };
    PathWrapper.prototype.join = function () {
        var _a;
        var joinPaths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            joinPaths[_i] = arguments[_i];
        }
        var stringjoinPaths = joinPaths.map(function (joinPath) {
            if (isPathType(joinPath))
                return joinPath.path;
            return joinPath;
        });
        var joinedPath = (_a = this.backend).join.apply(_a, __spreadArray([this.path], stringjoinPaths, false));
        return new this.Constructor(joinedPath);
    };
    PathWrapper.prototype.resolve = function () {
        var resolved_path = this.backend.resolve(this.path);
        return new this.Constructor(resolved_path);
    };
    PathWrapper.prototype.normalize = function () {
        var normalized_path = this.backend.normalize(this.path);
        return new this.Constructor(normalized_path);
    };
    PathWrapper.prototype.isAbsolute = function () {
        return this.backend.isAbsolute(this.path);
    };
    PathWrapper.relative = function (from, to) {
        if (isPathType(from)) {
            from = from.path;
        }
        if (isPathType(to)) {
            to = to.path;
        }
        var relative = this.backend.relative(from, to);
        return new this(relative);
    };
    PathWrapper.prototype.toNamespacedPath = function () {
        var namespaced_path = this.backend.toNamespacedPath(this.path);
        return new this.Constructor(namespaced_path);
    };
    Object.defineProperty(PathWrapper.prototype, "dirname", {
        get: function () {
            var dirname = this.backend.dirname(this.path);
            return new this.Constructor(dirname);
        },
        enumerable: false,
        configurable: true
    });
    PathWrapper.prototype.basename = function (suffix) {
        return this.backend.basename(this.path, suffix);
    };
    Object.defineProperty(PathWrapper.prototype, "extname", {
        get: function () {
            return this.backend.extname(this.path);
        },
        enumerable: false,
        configurable: true
    });
    PathWrapper.format = function (pathObject) {
        var formatted = this.backend.format(pathObject);
        return new this(formatted);
    };
    PathWrapper.prototype.parse = function () {
        return this.backend.parse(this.path);
    };
    PathWrapper.prototype.matchesGlob = function (pattern) {
        return this.backend.matchesGlob(this.path, pattern);
    };
    PathWrapper.prototype.readFile = function () {
        return this.readFileBuffer().toString();
    };
    PathWrapper.prototype.readFileBuffer = function () {
        return node_fs_1.default.readFileSync(this.path);
    };
    PathWrapper.prototype.writeFile = function (data, options) {
        node_fs_1.default.writeFileSync(this.path, data, options);
        return this;
    };
    PathWrapper.prototype.isFile = function () {
        try {
            return node_fs_1.default.statSync(this.path).isFile();
        }
        catch (_a) {
            return false;
        }
    };
    PathWrapper.prototype.isDirectory = function () {
        try {
            return node_fs_1.default.statSync(this.path).isDirectory();
        }
        catch (_a) {
            return false;
        }
    };
    PathWrapper.prototype.makeDirectory = function (options) {
        node_fs_1.default.mkdirSync(this.path, options);
        return this;
    };
    PathWrapper.prototype.exists = function () {
        return node_fs_1.default.existsSync(this.path);
    };
    PathWrapper.prototype.createIfNotExists = function () {
        if (!this.exists()) {
            node_fs_1.default.mkdirSync(this.path, { recursive: true });
        }
        return this;
    };
    PathWrapper.prototype.removeSync = function (options) {
        node_fs_1.default.rmSync(this.path, options);
        return this;
    };
    PathWrapper.backend = node_path_1.default;
    PathWrapper.sep = node_path_1.default.sep;
    PathWrapper.delimiter = node_path_1.default.delimiter;
    return PathWrapper;
}());
var Path = /** @class */ (function (_super) {
    __extends(Path, _super);
    function Path() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Path;
}(PathWrapper));
exports.Path = Path;
var PathWin32 = /** @class */ (function (_super) {
    __extends(PathWin32, _super);
    function PathWin32() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backend = node_path_1.default.win32;
        return _this;
    }
    PathWin32.backend = node_path_1.default.win32;
    PathWin32.sep = node_path_1.default.win32.sep;
    PathWin32.delimiter = node_path_1.default.win32.delimiter;
    return PathWin32;
}(PathWrapper));
exports.PathWin32 = PathWin32;
var PathPosix = /** @class */ (function (_super) {
    __extends(PathPosix, _super);
    function PathPosix() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backend = node_path_1.default.posix;
        return _this;
    }
    PathPosix.backend = node_path_1.default.posix;
    PathPosix.sep = node_path_1.default.posix.sep;
    PathPosix.delimiter = node_path_1.default.posix.delimiter;
    return PathPosix;
}(PathWrapper));
exports.PathPosix = PathPosix;
exports.default = { Path: Path, PathWin32: PathWin32, PathPosix: PathPosix };
