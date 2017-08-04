var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("node_modules/dfv/src/public/valid", ["require", "exports", "node_modules/dfv/src/public/dfv", "node_modules/dfv/src/public/dfvBind"], function (require, exports, dfv_1, dfvBind_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validType;
    (function (validType) {
        validType[validType["int"] = 0] = "int";
        validType[validType["number"] = 1] = "number";
        validType[validType["string"] = 2] = "string";
        validType[validType["object"] = 3] = "object";
        validType[validType["file"] = 4] = "file";
    })(validType = exports.validType || (exports.validType = {}));
    var IFieldRes = (function () {
        function IFieldRes() {
            this.msg = valid.errMsg_;
            this.ok = false;
        }
        return IFieldRes;
    }());
    exports.IFieldRes = IFieldRes;
    var FileMultiple = (function () {
        function FileMultiple() {
        }
        return FileMultiple;
    }());
    exports.FileMultiple = FileMultiple;
    var valid = (function () {
        function valid(func, type) {
            this.func = func;
            this.type = type;
        }
        valid.setFieldCheckMetaData = function (obj, key, func) {
            dfv_1.dfv.setData(obj, "fieldCheckMap", key, func);
        };
        valid.getFieldCheckMetaData = function (obj, key) {
            return dfv_1.dfv.getData(obj, "fieldCheckMap", key);
        };
        valid.int = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null) {
                        obj.val = obj.defaul;
                    }
                    else {
                        obj.val = parseInt(obj.val);
                        if (isNaN(obj.val)) {
                            obj.val = obj.defaul;
                            ret = false;
                        }
                        else
                            ret = true;
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.intNotZero = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    var parasName = dfv_1.dfv.getParasNameMeta(target, propertyKey);
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null) {
                        obj.val = obj.defaul;
                    }
                    else {
                        obj.val = parseInt(obj.val);
                        if (isNaN(obj.val)) {
                            obj.val = obj.defaul;
                            ret = false;
                        }
                        else
                            ret = obj.val > 0;
                    }
                    if (msg)
                        obj.msg = msg;
                    else {
                        if (index !== void 0 && parasName)
                            obj.msg = parasName[index];
                        else
                            obj.msg = propertyKey;
                        obj.msg += " must be greater than 0";
                    }
                    if (func) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.intNullAble = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = true;
                    if (obj.val == null) {
                        obj.val = null;
                    }
                    else {
                        obj.val = parseInt(obj.val);
                        if (isNaN(obj.val)) {
                            obj.val = obj.defaul;
                            ret = false;
                        }
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.float = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null) {
                        obj.val = obj.defaul;
                    }
                    else {
                        obj.val = parseFloat(obj.val);
                        if (isNaN(obj.val)) {
                            obj.val = obj.defaul;
                            ret = false;
                        }
                        else
                            ret = true;
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.array = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null) {
                        obj.val = obj.defaul;
                    }
                    else if (!Array.isArray(obj.val)) {
                        obj.val = obj.defaul;
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.file = function (func, msg) {
            return new valid(function (file) {
                var ret = true;
                if (msg)
                    file.msg = msg;
                if (file.val && !file.val.path) {
                    return false;
                }
                if (func) {
                    ret = func(file);
                }
                return ret;
            }, validType.file);
        };
        valid.fileArray = function (func, msg) {
            return new valid(function (file) {
                var ret = true;
                if (file.val == null) {
                    file.val = [];
                }
                else if (!Array.isArray(file.val)) {
                    file.val = [];
                }
                if (msg)
                    file.msg = msg;
                if (func) {
                    ret = func(file);
                }
                return ret;
            }, validType.file);
        };
        valid.object = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null || typeof obj.val != "object") {
                        obj.val = obj.defaul;
                    }
                    else {
                        valid.checkObj(obj.val, obj.defaul, obj);
                        if (!obj.ok)
                            return false;
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.stringNotEmpty = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    var parasName = dfv_1.dfv.getParasNameMeta(target, propertyKey);
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null) {
                        obj.val = obj.defaul;
                    }
                    else {
                        obj.val = obj.val + "";
                        ret = obj.val.length > 0;
                    }
                    if (msg)
                        obj.msg = msg;
                    else {
                        if (index !== void 0 && parasName)
                            obj.msg = parasName[index];
                        else
                            obj.msg = propertyKey;
                        obj.msg += " can not be empty";
                    }
                    if (func instanceof RegExp) {
                        ret = func.test(obj.val);
                    }
                    else if (func instanceof Function) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.string = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = false;
                    if (obj.val == null) {
                        obj.val = obj.defaul;
                    }
                    else {
                        obj.val = obj.val + "";
                        ret = true;
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func instanceof RegExp) {
                        ret = func.test(obj.val);
                    }
                    else if (func instanceof Function) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.stringNullAble = function (func, msg) {
            return function (target, propertyKey, index) {
                if (index !== void 0)
                    propertyKey += index;
                valid.setFieldCheckMetaData(target.constructor, propertyKey, function (obj) {
                    var ret = true;
                    if (obj.val == null) {
                        obj.val = null;
                    }
                    else {
                        obj.val = obj.val + "";
                    }
                    if (msg)
                        obj.msg = msg;
                    if (func instanceof RegExp) {
                        ret = func.test(obj.val);
                    }
                    else if (func instanceof Function) {
                        ret = func(obj);
                    }
                    return ret;
                });
            };
        };
        valid.bindAble = function (className) {
            if (typeof className === "function") {
                var ret = new className();
                dfvBind_1.BindField.init(ret);
                return ret;
            }
            dfvBind_1.BindField.init(className);
            return className;
        };
        valid.check = function (from, objRes) {
            return valid.checkObj(from, from, objRes);
        };
        valid.checkObj = function (from, toObj, objRes, from2, valids) {
            if (objRes == null) {
                objRes = new IFieldRes();
            }
            objRes.ok = true;
            for (var key in toObj) {
                objRes.defaul = toObj[key];
                var type = typeof objRes.defaul;
                if (type === "function")
                    continue;
                if (valids && objRes.defaul instanceof valid) {
                    objRes.val = valids[key];
                    objRes.msg = key + " " + valid.errMsg_;
                    objRes.ok = objRes.defaul.func(objRes);
                    toObj[key] = objRes.val;
                    if (!objRes.ok) {
                        break;
                    }
                    continue;
                }
                objRes.val = from[key];
                objRes.msg = key + valid.errMsg_;
                if (from2 && objRes.val === void 0) {
                    objRes.val = from2[key];
                }
                var func = valid.getFieldCheckMetaData(toObj.constructor, key);
                if (func) {
                    objRes.ok = func(objRes);
                    toObj[key] = objRes.val;
                    if (!objRes.ok) {
                        break;
                    }
                    continue;
                }
                if (objRes.val == null) {
                    objRes.val = objRes.defaul;
                }
                else if (type === "number") {
                    objRes.val = parseFloat(objRes.val);
                    if (isNaN(objRes.val))
                        objRes.val = objRes.defaul;
                }
                else if (type === "string") {
                    objRes.val = (objRes.val + "");
                }
                else if (objRes.defaul && type === "object") {
                    if (typeof objRes.val != "object") {
                        objRes.ok = false;
                        break;
                    }
                    valid.checkObj(objRes.val, objRes.defaul, objRes);
                    if (!objRes.ok) {
                        break;
                    }
                }
                toObj[key] = objRes.val;
            }
            objRes.val = toObj;
            return objRes;
        };
        valid.checkAsync = function (from, objRes) {
            return valid.checkObjAsync(from, from, objRes);
        };
        valid.checkObjAsync = function (from, toObj, objRes) {
            return __awaiter(this, void 0, void 0, function () {
                var bindList, _a, _b, _i, key, type, _c, bindList_1, it_1, _d, _e, bind, e_1, _f, _g, arr, func;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (!objRes)
                                objRes = new IFieldRes();
                            objRes.ok = true;
                            bindList = [];
                            _a = [];
                            for (_b in from)
                                _a.push(_b);
                            _i = 0;
                            _h.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 11];
                            key = _a[_i];
                            dfvBind_1.BindField.initGetBindList(function (bl) {
                                objRes.defaul = from[key];
                                bindList = bl;
                            });
                            type = typeof objRes.defaul;
                            if (type === "function")
                                return [3, 10];
                            objRes.val = objRes.defaul;
                            objRes.msg = key + " " + valid.errMsg_;
                            if (!(bindList.length > 0)) return [3, 9];
                            _c = 0, bindList_1 = bindList;
                            _h.label = 2;
                        case 2:
                            if (!(_c < bindList_1.length)) return [3, 9];
                            it_1 = bindList_1[_c];
                            _d = 0, _e = it_1.htmlBind;
                            _h.label = 3;
                        case 3:
                            if (!(_d < _e.length)) return [3, 8];
                            bind = _e[_d];
                            if (!(bind.html && bind.editAble && bind.onSet)) return [3, 7];
                            _h.label = 4;
                        case 4:
                            _h.trys.push([4, 6, , 7]);
                            bind.isEditOnSet = false;
                            return [4, bind.onSet(objRes.val, bind, it_1)];
                        case 5:
                            _h.sent();
                            return [3, 7];
                        case 6:
                            e_1 = _h.sent();
                            objRes.msg = e_1.message;
                            objRes.ok = false;
                            return [2, objRes];
                        case 7:
                            _d++;
                            return [3, 3];
                        case 8:
                            _c++;
                            return [3, 2];
                        case 9:
                            if (objRes.defaul && type == "object") {
                                valid.checkObj(objRes.defaul, objRes.defaul, objRes);
                                if (!objRes.ok) {
                                    return [2, objRes];
                                }
                            }
                            if (objRes.defaul && objRes.defaul instanceof Array) {
                                for (_f = 0, _g = objRes.defaul; _f < _g.length; _f++) {
                                    arr = _g[_f];
                                    if (arr && typeof arr == "object") {
                                        valid.checkObj(arr, arr, objRes);
                                        if (!objRes.ok) {
                                            return [2, objRes];
                                        }
                                    }
                                }
                            }
                            func = valid.getFieldCheckMetaData(from.constructor, key);
                            if (func) {
                                objRes.ok = func(objRes);
                                if (!objRes.ok) {
                                    return [2, objRes];
                                }
                            }
                            _h.label = 10;
                        case 10:
                            _i++;
                            return [3, 1];
                        case 11: return [2, objRes];
                    }
                });
            });
        };
        valid.errMsg_ = " : invalid!";
        return valid;
    }());
    exports.valid = valid;
});
define("node_modules/dfv/src/public/dfvFuncExt", ["require", "exports", "node_modules/dfv/src/public/valid"], function (require, exports, valid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dfvFuncExtInit() {
    }
    exports.dfvFuncExtInit = dfvFuncExtInit;
    String.prototype.removeLast = function () {
        return this.substr(0, this.length - 1);
    };
    Date.prototype.toJSON = function () {
        return this.valueOf();
    };
    String.prototype.htmlEncode = function () {
        var ret = "";
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            if (s === " ")
                ret += "&nbsp;";
            else if (s === "<")
                ret += "&lt;";
            else if (s === ">")
                ret += "&gt;";
            else if (s === "&")
                ret += "&amp;";
            else
                ret += s;
        }
        return ret;
    };
    if (!Array.prototype.map) {
        Array.prototype.map = function (callbackfn) {
            var arr = Array();
            for (var i = 0; i < this.length; i++) {
                arr.push(callbackfn(this[i], i, arr));
            }
            return arr;
        };
    }
    else if (!Array.prototype.eachToInt) {
        Object.defineProperty(Number.prototype, "loop", {
            value: function (func) {
                for (var i = 0; i < this; i++) {
                    func(i);
                }
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Number.prototype, "loopMap", {
            value: function (func) {
                var arr = Array();
                for (var i = 0; i < this; i++) {
                    arr.push(func(i));
                }
                return arr;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "add", {
            value: function (index, item) {
                this.splice(index, 0, item);
                return this;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "mapString", {
            value: function (func) {
                var str = "";
                for (var i = 0; i < this.length; i++) {
                    var ret = func(this[i], i);
                    if (ret != null)
                        str += ret;
                }
                return str;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "binarySearch", {
            value: function (func) {
                var startIndex = 0;
                var stopIndex = this.length - 1;
                while (startIndex <= stopIndex) {
                    var middle = (stopIndex + startIndex) >>> 1;
                    var ret = func(this[middle]);
                    if (ret < 0) {
                        stopIndex = middle - 1;
                    }
                    else if (ret > 0) {
                        startIndex = middle + 1;
                    }
                    else {
                        return middle;
                    }
                }
                return -1;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "eachToInt", {
            value: function (func) {
                for (var i = 0; i < this.length; i++) {
                    this[i] = parseInt(this[i]);
                    if (isNaN(this[i])) {
                        this[i] = 0;
                        return false;
                    }
                    if (func) {
                        if (!func(this[i]))
                            return false;
                    }
                }
                return true;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "each", {
            value: function (func) {
                for (var i = 0; i < this.length; i++) {
                    if (!func(this[i]))
                        return false;
                }
                return true;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "eachToFloat", {
            value: function (func) {
                for (var i = 0; i < this.length; i++) {
                    this[i] = parseFloat(this[i]);
                    if (isNaN(this[i])) {
                        this[i] = 0;
                        return false;
                    }
                    if (func) {
                        if (!func(this[i]))
                            return false;
                    }
                }
                return true;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "eachToString", {
            value: function (func) {
                for (var i = 0; i < this.length; i++) {
                    this[i] = this[i] + "";
                    if (func) {
                        if (!func(this[i]))
                            return false;
                    }
                }
                return true;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "eachToObj", {
            value: function (className, msg) {
                if (msg == null)
                    msg = new valid_1.IFieldRes();
                for (var i = 0; i < this.length; i++) {
                    valid_1.valid.checkObj(this[i], new className(), msg);
                    this[i] = msg.val;
                    if (!msg.ok)
                        return false;
                }
                return true;
            },
            enumerable: false,
            writable: true,
        });
        Object.defineProperty(Array.prototype, "mapPromise", {
            value: function (callbackfn) {
                return __awaiter(this, void 0, void 0, function () {
                    var arr, i, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                arr = new Array();
                                i = 0;
                                _c.label = 1;
                            case 1:
                                if (!(i < this.length)) return [3, 4];
                                _b = (_a = arr).push;
                                return [4, callbackfn(this[i], i, arr)];
                            case 2:
                                _b.apply(_a, [_c.sent()]);
                                _c.label = 3;
                            case 3:
                                i++;
                                return [3, 1];
                            case 4: return [2, arr];
                        }
                    });
                });
            },
            enumerable: false,
        });
        Object.defineProperty(Array.prototype, "mapStringPromise", {
            value: function (callbackfn) {
                return __awaiter(this, void 0, void 0, function () {
                    var str, i, ret;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                str = "";
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < this.length)) return [3, 4];
                                return [4, callbackfn(this[i], i)];
                            case 2:
                                ret = _a.sent();
                                if (ret != null)
                                    str += ret;
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3, 1];
                            case 4: return [2, str];
                        }
                    });
                });
            },
            enumerable: false,
        });
    }
});
define("node_modules/dfv/src/public/dfv", ["require", "exports", "node_modules/dfv/src/public/dfvFuncExt"], function (require, exports, dfvFuncExt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    dfvFuncExt_1.dfvFuncExtInit();
    exports.ARRAY_TYPE = "_ARR_TYPE";
    if (typeof Symbol === "function") {
        exports.ARRAY_TYPE = Symbol.for("_ARR_TYPE");
    }
    function arrayNumber(val) {
        if (!val) {
            val = [];
        }
        val[exports.ARRAY_TYPE] = Number;
        return val;
    }
    exports.arrayNumber = arrayNumber;
    function arrayString(val) {
        if (!val) {
            val = [];
        }
        val[exports.ARRAY_TYPE] = String;
        return val;
    }
    exports.arrayString = arrayString;
    function array(type, val) {
        if (!val) {
            val = [];
        }
        val[exports.ARRAY_TYPE] = type;
        return val;
    }
    exports.array = array;
    var COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var DEFAULT_PARAMS = /=[^,]+/mg;
    var FAT_ARROWS = /=>.*$/mg;
    var dfv = (function () {
        function dfv() {
        }
        dfv.sleep = function (time) {
            return new Promise(function (reso, reject) {
                setTimeout(function () {
                    try {
                        reso();
                    }
                    catch (e) {
                        reject(e);
                    }
                }, time);
            });
        };
        dfv.compare = function (l, r) {
            if (l.localeCompare) {
                return l.localeCompare(r);
            }
            return l - r;
        };
        dfv.err = function (msg) {
            var err = Error(msg);
            err.showMsg = true;
            return err;
        };
        dfv.getFuncName = function (func) {
            if (func.name !== void 0)
                return func.name;
            var matches = dfv.funcReg.exec(func + "");
            if (matches)
                return matches[1];
            return "";
        };
        dfv.dateToY_M_D = function (p, symb) {
            if (symb === void 0) { symb = "-"; }
            var d = typeof p === "number" ? new Date(p) : p;
            return d.getFullYear() + symb + (d.getMonth() + 1) + symb + d.getDate();
        };
        dfv.dateToY_M_D_H_M_S = function (p, showSecond) {
            if (showSecond === void 0) { showSecond = true; }
            var d = typeof p === "number" ? new Date(p) : p;
            return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " "
                + d.getHours() + ":" + d.getMinutes() + (showSecond ? (":" + d.getSeconds()) : "");
        };
        dfv.now = function () {
            return Date.now();
        };
        dfv.nowSec = function () {
            return Math.floor(Date.now() / 1000);
        };
        dfv.getArrayType = function (val) {
            return val[exports.ARRAY_TYPE];
        };
        dfv.setPrototypeOf = function (target, proto) {
            if (Object.setPrototypeOf)
                Object.setPrototypeOf(target, proto);
            else if (target.__proto__) {
                target.__proto__ = proto;
            }
            else {
                for (var prop in proto) {
                    target[prop] = proto[prop];
                }
            }
        };
        dfv.joinObjFast = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            var first = values[0];
            for (var i = 1; i < values.length; i++) {
                var next = values[i];
                for (var key in next) {
                    first[key] = next[key];
                }
            }
            return first;
        };
        dfv.joinObj = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            var clas = function () {
            };
            var newObj = new clas();
            for (var i = 0; i < values.length; i++) {
                var next = values[i];
                dfv.setParent(newObj.constructor, next.constructor);
                for (var key in next) {
                    newObj[key] = next[key];
                }
            }
            return newObj;
        };
        dfv.leftJoin = function (left, right, funcL, funcR, overrideLeft) {
            if (!right || right.length < 1)
                return left;
            return dfv.leftJoinMap(left, dfv.arrToMap(right, funcR), funcL, overrideLeft);
        };
        dfv.getFuncBody = function (func) {
            var funStr = func + "";
            var i = funStr.indexOf("=>");
            if (i > 0) {
                return funStr.substring(i + 2, funStr.length);
            }
            return funStr;
        };
        dfv.arrToMap = function (right, funcR, filter) {
            var rightMap = {};
            if (filter) {
                for (var i = 0; i < right.length; i++) {
                    var rObj = right[i];
                    if (filter(rObj))
                        rightMap[funcR(rObj)] = rObj;
                }
            }
            else {
                for (var i = 0; i < right.length; i++) {
                    var rObj = right[i];
                    rightMap[funcR(rObj)] = rObj;
                }
            }
            return rightMap;
        };
        dfv.mapToArr = function (right, filter) {
            var ret = Array();
            if (filter) {
                for (var k in right) {
                    var val = right[k];
                    if (filter(k, val))
                        ret.push(val);
                }
            }
            else {
                for (var k in right) {
                    ret.push(right[k]);
                }
            }
            return ret;
        };
        dfv.isInt = function (val) {
            if (val == null || val.length == 0) {
                return false;
            }
            for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                var u = val_1[_i];
                if (u < '0' || u > '9')
                    return false;
            }
            return true;
        };
        dfv.showByte = function (num) {
            if (num <= 1024) {
                return "" + num + " Byte";
            }
            if (num <= 1024 * 1024) {
                return (num / 1024).toFixed(1) + " KB";
            }
            if (num <= 1024 * 1024 * 1024) {
                return (num / 1024.0 / 1024.0).toFixed(1) + " MB";
            }
            return (num / 1024.0 / 1024.0 / 1024.0).toFixed(1) + " GB";
        };
        dfv.leftJoinMap = function (left, right, funcL, overrideLeft) {
            if (!left || left.length < 1)
                return left;
            for (var i = 0; i < left.length; i++) {
                var lObj = left[i];
                var rObj = right[funcL(lObj)];
                if (rObj) {
                    if (overrideLeft) {
                        for (var na in rObj) {
                            lObj[na] = rObj[na];
                        }
                    }
                    else {
                        for (var na in rObj) {
                            if (lObj[na] == null)
                                lObj[na] = rObj[na];
                        }
                    }
                }
            }
            return left;
        };
        dfv.fixNameUpperCase = function (name, symble, filterCode) {
            if (symble == "") {
                symble = "_";
            }
            var ret = "";
            for (var i = 0; i < name.length; i++) {
                var c = name[i];
                if (c === filterCode)
                    continue;
                if (c == symble) {
                    i++;
                    if (i < name.length)
                        ret += name[i].toUpperCase();
                    continue;
                }
                ret += c;
            }
            return ret;
        };
        dfv.getAutoInc = function () {
            return dfv.autoInc++;
        };
        dfv.randomInt = function (num) {
            return Math.floor(Math.random() * num);
        };
        dfv.getRandFixNum = function (len) {
            var ret = "";
            for (var i = 0; i < len; i++) {
                ret += Math.floor(Math.random() * 10);
            }
            return ret;
        };
        dfv.getUniqueId = function () {
            dfv.autoInc += 1;
            if (dfv.autoInc >= 0xFFFFF)
                dfv.autoInc = 0;
            var ret = Date.now().toString(16) + "" + dfv.autoInc.toString(16);
            for (var i = ret.length; i < 11 + 5; i++) {
                ret += "0";
            }
            for (var i = 0; i < 6; i++) {
                ret += dfv.hexString[dfv.randomInt(16)];
            }
            return ret;
        };
        dfv.getUniqueId16 = function () {
            dfv.autoInc += 1;
            if (dfv.autoInc >= 1679616)
                dfv.autoInc = 0;
            var ret = Date.now().toString(36) + dfv.autoInc.toString(36);
            for (var i = ret.length; i < 8 + 4; i++) {
                ret += "0";
            }
            for (var i = 0; i < 4; i++) {
                ret += dfv.hexString[dfv.randomInt(36)];
            }
            return ret;
        };
        dfv.getData = function (clas, metaKey, field) {
            if (!clas)
                return void 0;
            var ret;
            if (clas._fieldMetaDataMap_)
                ret = clas._fieldMetaDataMap_[dfv.getKey(metaKey, field)];
            if (ret === void 0) {
                var parent = clas.__proto__;
                if (parent && parent instanceof Function)
                    return dfv.getData(parent, metaKey, field);
                else
                    return void 0;
            }
            return ret;
        };
        dfv.setData = function (classType, metaKey, field, data) {
            if (!classType._fieldMetaDataMap_)
                classType._fieldMetaDataMap_ = {};
            classType._fieldMetaDataMap_[dfv.getKey(metaKey, field)] = data;
        };
        dfv.getKey = function (metaKey, field) {
            return "_" + metaKey + "_" + field + "_";
        };
        dfv.getParent = function (clas) {
            var ret = Array();
            var cl = Object.getPrototypeOf(clas);
            if (cl && cl instanceof Function) {
                ret.push(cl);
            }
            var meta = dfv.getData(clas, "class_parent", "");
            if (meta) {
                for (var _i = 0, meta_1 = meta; _i < meta_1.length; _i++) {
                    var m = meta_1[_i];
                    ret.push(m);
                }
            }
            return ret;
        };
        dfv.setParent = function (clas, parent) {
            var meta = dfv.getData(clas, "class_parent", "");
            if (meta == null) {
                meta = [];
                dfv.setData(clas, "class_parent", "", meta);
            }
            var par = dfv.getParent(parent);
            if (par.length > 0)
                par.forEach(function (it) { return meta.push(it); });
            meta.push(parent);
        };
        dfv.hashCode = function (str) {
            var hash = 0, i, chr, len;
            if (str.length === 0)
                return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash;
        };
        dfv.getFileName = function (file) {
            var pos = file.lastIndexOf("/");
            if (pos >= 0) {
                return file.substring(pos + 1, file.length);
            }
            return "";
        };
        dfv.tempMenu = function () {
            return dfv.root + "/runtime/temp/";
        };
        dfv.getTemp = function () {
            var now = new Date();
            return dfv.tempMenu() + now.getDate() + "/";
        };
        dfv.getParameterNames = function (fn) {
            var code = fn.toString()
                .replace(COMMENTS, '')
                .replace(FAT_ARROWS, '')
                .replace(DEFAULT_PARAMS, '');
            var result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
                .match(/([^\s,]+)/g);
            return result === null
                ? []
                : result;
        };
        dfv.setParasNameMeta = function (clas, method, paras) {
            dfv.setData(clas, "paras_name", method, paras);
        };
        dfv.getParasNameMeta = function (target, propertyKey) {
            var ret = dfv.getData(target.constructor, "paras_name", propertyKey);
            if (!ret) {
                var func = target[propertyKey];
                if (!func)
                    throw Error(target.constructor.name + " not have " + propertyKey);
                ret = dfv.getParameterNames(func);
                dfv.setParasNameMeta(target.constructor, propertyKey, ret);
            }
            return ret;
        };
        dfv.root = "";
        dfv.meta = {
            type: "design:type",
            paraType: "design:paramtypes",
            returnType: "design:returntype",
        };
        dfv.funcReg = /function\s*(\w*)/i;
        dfv.autoInc = 0;
        dfv.hexString = "0123456789abcdefghijklmnopqrstuvwxyz";
        return dfv;
    }());
    exports.dfv = dfv;
});
define("node_modules/dfv/src/public/dfvBind", ["require", "exports", "node_modules/dfv/src/public/dfv", "node_modules/dfv/src/public/dfvFront", "node_modules/dfv/src/public/valid"], function (require, exports, dfv_2, dfvFront_1, valid_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BindFieldType;
    (function (BindFieldType) {
        BindFieldType[BindFieldType["string"] = 0] = "string";
        BindFieldType[BindFieldType["number"] = 1] = "number";
        BindFieldType[BindFieldType["boolean"] = 2] = "boolean";
        BindFieldType[BindFieldType["array"] = 3] = "array";
        BindFieldType[BindFieldType["object"] = 4] = "object";
    })(BindFieldType = exports.BindFieldType || (exports.BindFieldType = {}));
    function dfvBind(func, ext) {
        var _this = this;
        if (ext === void 0) { ext = {}; }
        var bind = new dfvBindDom(func);
        bind.onSet = function (val, bind, field) { return __awaiter(_this, void 0, void 0, function () {
            var func, objRes, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        bind.onError(null, val, bind, field);
                        if (field.fieldName && field.parent) {
                            func = valid_2.valid.getFieldCheckMetaData(field.parent.constructor, field.fieldName);
                            if (func) {
                                objRes = new valid_2.IFieldRes();
                                objRes.val = val;
                                objRes.ok = func(objRes);
                                if (!objRes.ok)
                                    throw dfv_2.dfv.err(objRes.msg);
                                val = objRes.val;
                            }
                        }
                        if (!ext.onSet) return [3, 2];
                        return [4, ext.onSet(val, bind, field)];
                    case 1: return [2, _a.sent()];
                    case 2: return [2, val];
                    case 3: return [3, 5];
                    case 4:
                        e_2 = _a.sent();
                        bind.onError(e_2, val, bind, field);
                        throw e_2;
                    case 5: return [2];
                }
            });
        }); };
        if (ext.cancelDoubleBind)
            bind.cancelDoubleBind = ext.cancelDoubleBind;
        if (ext.onError)
            bind.onError = ext.onError;
        return bind;
    }
    exports.dfvBind = dfvBind;
    var dfvBindDom = (function () {
        function dfvBindDom(bindFunc) {
            this.bindFunc = bindFunc;
            this.editAble = false;
            this.protoName = "";
            this.isEditOnSet = false;
            this.onError = function (err, val, bind, field) {
            };
        }
        dfvBindDom.findNextSpan = function (e) {
            var span = e ? (e.nextElementSibling || e.nextSibling) : null;
            if (span && span.localName != "span") {
                span = (span.nextElementSibling || span.nextSibling);
                if (span && span.localName != "span") {
                    span = null;
                }
            }
            return span;
        };
        dfvBindDom.showErrorToNextSpan = function (err, val, bind, field) {
            var span = dfvBindDom.findNextSpan(bind.html);
            if (span) {
                if (err) {
                    span.innerHTML = err.message;
                    if (bind.html && bind.html.select)
                        bind.html.select();
                }
                else
                    span.innerHTML = "";
            }
        };
        return dfvBindDom;
    }());
    exports.dfvBindDom = dfvBindDom;
    var BindField = (function () {
        function BindField(val, type, fieldName, parent) {
            this.val = val;
            this.type = type;
            this.fieldName = fieldName;
            this.parent = parent;
            this.uniqueId = ++BindField.autoId;
            this.htmlBind = Array();
            this.watcherLists = [];
        }
        BindField.initGetBindList = function (func) {
            var getBindListOld = BindField.getBindList;
            var bindListMapOld = BindField.bindListMap;
            BindField.getBindList = [];
            BindField.bindListMap = {};
            try {
                func(BindField.getBindList);
            }
            catch (e) {
                dfvFront_1.dfvFront.onCatchError(e);
            }
            finally {
                BindField.getBindList = getBindListOld;
                BindField.bindListMap = bindListMapOld;
            }
        };
        BindField.prototype.addWatcherFunc = function (func) {
            this.watcherLists.push(func);
        };
        BindField.prototype.addWatcherElem = function (elem, key, bindFun) {
            this.addWatcherFunc(function (v, e, ind) {
                if (e === elem)
                    return;
                if (elem.parentElement == null) {
                    return;
                }
                var retVal = bindFun.bindFunc(elem);
                if (key === "innerHTML") {
                    dfvFront_1.dfvFront.setEle(elem, retVal);
                    return;
                }
                if (elem.localName === "input" && elem.type === "radio" && key === "bind") {
                    if (elem.value == retVal) {
                        elem.checked = true;
                    }
                    return;
                }
                if (retVal == null)
                    elem[key] = "";
                else
                    elem[key] = retVal;
            });
        };
        BindField.init = function (obj, parent, field) {
            var type = typeof obj;
            var f_a = new BindField(obj, BindFieldType.string, field, parent);
            if (obj == null || type === "string" || obj instanceof Date) {
                f_a.type = BindFieldType.string;
            }
            else if (type === "number") {
                f_a.type = BindFieldType.number;
            }
            else if (type === "boolean") {
                f_a.type = BindFieldType.boolean;
            }
            else if (type === "function") {
                return;
            }
            else if (obj instanceof Array) {
                obj.__BindField__ = f_a;
                f_a.type = BindFieldType.array;
                for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                    var arr = obj_1[_i];
                    BindField.init(arr);
                }
                var oldPush_1 = obj.push;
                obj.push = function (val) {
                    BindField.init(val);
                    var ret = oldPush_1.call(obj, val);
                    if (obj.__BindField__)
                        obj.__BindField__.execWatcherList();
                    return ret;
                };
                var oldSplice_1 = obj.splice;
                obj.splice = function () {
                    var ret = oldSplice_1.apply(obj, arguments);
                    if (obj.__BindField__)
                        obj.__BindField__.execWatcherList();
                    return ret;
                };
                var sortOld_1 = obj.sort;
                obj.sort = function (val) {
                    var ret = sortOld_1.call(obj, val);
                    if (obj.__BindField__)
                        obj.__BindField__.execWatcherList();
                    return ret;
                };
                var popOld_1 = obj.pop;
                obj.pop = function () {
                    var ret = popOld_1.call(obj);
                    if (obj.__BindField__)
                        obj.__BindField__.execWatcherList();
                    return ret;
                };
            }
            else {
                f_a.type = BindFieldType.object;
                for (var k in obj) {
                    if (typeof obj[k] === "function")
                        continue;
                    BindField.init(obj[k], obj, k);
                }
            }
            if (parent && field) {
                delete parent[field];
                Object.defineProperty(parent, field, {
                    get: function () {
                        if (BindField.getBindList && !BindField.bindListMap[f_a.uniqueId]) {
                            BindField.getBindList.push(f_a);
                            BindField.bindListMap[f_a.uniqueId] = true;
                        }
                        return f_a.getVal();
                    },
                    set: function (s) {
                        BindField.init(s);
                        f_a.setVal(s);
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        };
        BindField.prototype.toString = function () {
            return this.val + "";
        };
        BindField.prototype.valueOf = function () {
            return this.val;
        };
        BindField.prototype.toJSON = function () {
            return this.val;
        };
        BindField.prototype.getVal = function () {
            return this.val;
        };
        BindField.prototype.check = function () {
        };
        BindField.prototype.setVal = function (val, ele) {
            this.val = val;
            this.execWatcherList(ele);
        };
        BindField.prototype.execWatcherList = function (ele) {
            for (var i = 0; i < this.watcherLists.length; i++) {
                this.watcherLists[i](this.val, ele, i);
            }
        };
        BindField.getBindList = null;
        BindField.bindListMap = {};
        BindField.autoId = 0;
        return BindField;
    }());
    exports.BindField = BindField;
});
define("node_modules/dfv/src/public/dfvReact", ["require", "exports", "node_modules/dfv/src/public/dfvBind", "node_modules/dfv/src/public/dfvFront", "node_modules/dfv/src/public/dfv"], function (require, exports, dfvBind_2, dfvFront_2, dfv_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.singleTag = {
        "meta": true,
        "img": true,
        "br": true,
        "hr": true,
        "link": true,
    };
    function setEleEvent(bindFun, event, elem, key, bind) {
        var old = elem[event];
        elem[event] = function (e) {
            for (var _i = 0, bind_1 = bind; _i < bind_1.length; _i++) {
                var b = bind_1[_i];
                if (b.type === dfvBind_2.BindFieldType.object || b.type === dfvBind_2.BindFieldType.array)
                    continue;
                setBind(bindFun, b, elem, elem[key]);
            }
            if (old)
                old.call(elem, e);
        };
    }
    function setOnInputEvent(bindFun, elem, key, bind) {
        var cpLock = false;
        elem.addEventListener('compositionstart', function () {
            cpLock = true;
        });
        elem.addEventListener('compositionend', function () {
            cpLock = false;
            for (var _i = 0, bind_2 = bind; _i < bind_2.length; _i++) {
                var b = bind_2[_i];
                if (b.type === dfvBind_2.BindFieldType.object || b.type === dfvBind_2.BindFieldType.array)
                    continue;
                setBind(bindFun, b, elem, elem[key]);
            }
        });
        var old = elem["oninput"];
        elem["oninput"] = function (e) {
            if (cpLock)
                return;
            for (var _i = 0, bind_3 = bind; _i < bind_3.length; _i++) {
                var b = bind_3[_i];
                if (b.type === dfvBind_2.BindFieldType.object || b.type === dfvBind_2.BindFieldType.array)
                    continue;
                setBind(bindFun, b, elem, elem[key]);
            }
            if (old)
                old.call(elem, e);
        };
    }
    function getVal(bind, val) {
        if (bind.type === dfvBind_2.BindFieldType.number) {
            if (val === false)
                return 0;
            else if (val === true)
                return 1;
            else if (typeof val === "number")
                return val;
            else {
                var res = parseFloat(val);
                if (isNaN(res))
                    return 0;
                else
                    return res;
            }
        }
        else if (bind.type === dfvBind_2.BindFieldType.boolean)
            return Boolean(val);
        else
            return val + "";
    }
    function setVal(bind, val, elem) {
        try {
            bind.setVal(val, elem);
        }
        catch (e) {
            dfvFront_2.dfvFront.onCatchError(e);
        }
    }
    function setBind(bindFun, bind, elem, val) {
        if (bindFun.onSet) {
            bindFun.isEditOnSet = true;
            var res_1 = getVal(bind, val);
            try {
                var ret = bindFun.onSet(res_1, bindFun, bind);
                if (ret instanceof Promise) {
                    ret.then(function (r) { return setVal(bind, r, elem); })
                        .catch(function (e) { return setVal(bind, res_1, elem); });
                    return;
                }
                res_1 = ret;
            }
            catch (e) {
            }
            setVal(bind, res_1, elem);
        }
        else {
            bind.setVal(getVal(bind, val), elem);
        }
    }
    function bindProt(elem, key, bindFun) {
        bindFun.html = elem;
        var bindFields = [];
        var ret;
        dfvBind_2.BindField.initGetBindList(function (list) {
            bindFields = list;
            ret = bindFun.bindFunc(elem);
        });
        if (bindFields.length < 1)
            return ret;
        bindFun.protoName = key;
        if (!bindFun.cancelDoubleBind) {
            if (elem.localName === "input" && key === "checked") {
                bindFun.editAble = true;
                setEleEvent(bindFun, "onclick", elem, "checked", bindFields);
            }
            else if (elem.localName === "input" && key === "value") {
                bindFun.editAble = true;
                setOnInputEvent(bindFun, elem, "value", bindFields);
            }
            else if (elem.localName === "input" && elem.type === "radio" && key === "bind") {
                bindFun.editAble = true;
                bindFun.protoName = "value";
                setEleEvent(bindFun, "onclick", elem, "value", bindFields);
                if (elem.value == ret)
                    elem.checked = true;
            }
            else if (elem.localName === "select" && key === "value") {
                bindFun.editAble = true;
                setEleEvent(bindFun, "onchange", elem, "value", bindFields);
            }
        }
        for (var _i = 0, bindFields_1 = bindFields; _i < bindFields_1.length; _i++) {
            var bind = bindFields_1[_i];
            bind.htmlBind.push(bindFun);
            bind.addWatcherElem(elem, key, bindFun);
        }
        return ret;
    }
    function bindInnerHtml(elem, bindFun) {
        bindFun.html = elem;
        var bindFields = [];
        var ret;
        dfvBind_2.BindField.initGetBindList(function (list) {
            bindFields = list;
            ret = bindFun.bindFunc(elem);
        });
        if (bindFields.length < 1)
            return ret;
        if (elem.localName === "textarea") {
            bindFun.protoName = "value";
            bindFun.editAble = true;
            if (!bindFun.cancelDoubleBind) {
                setEleEvent(bindFun, "oninput", elem, "value", bindFields);
            }
            for (var _i = 0, bindFields_2 = bindFields; _i < bindFields_2.length; _i++) {
                var bind = bindFields_2[_i];
                bind.htmlBind.push(bindFun);
                bind.addWatcherElem(elem, "value", bindFun);
            }
        }
        else {
            bindFun.protoName = "innerHTML";
            for (var _a = 0, bindFields_3 = bindFields; _a < bindFields_3.length; _a++) {
                var bind = bindFields_3[_a];
                bind.addWatcherElem(elem, "innerHTML", bindFun);
            }
        }
        return ret;
    }
    if (typeof window === "undefined") {
        exports.createElement = function createElement(ele, prot) {
            var ret = "";
            ret += "<" + ele + " ";
            if (prot) {
                for (var k in prot) {
                    ret += k + "=\"";
                    if (prot[k] instanceof Function)
                        ret += dfv_3.dfv.getFuncBody(prot[k]);
                    else
                        ret += prot[k];
                    ret += "\" ";
                }
            }
            ret += ">";
            if (arguments.length > 2) {
                for (var i = 2; i < arguments.length; i++) {
                    var args = arguments[i];
                    if (args != null) {
                        if (args instanceof Array)
                            args.forEach(function (it) {
                                if (it != null)
                                    ret += it;
                            });
                        else if (args instanceof Function) {
                            ret += dfv_3.dfv.getFuncBody(args);
                        }
                        else
                            ret += args;
                    }
                }
            }
            if (!exports.singleTag[ele])
                ret += "</" + ele + ">";
            return ret;
        };
    }
    else {
        exports.createElement = function createElement(ele, prot) {
            var elem = document.createElement(ele);
            var value = null;
            if (prot) {
                var _loop_1 = function (ke) {
                    var k = ke;
                    if (ke == "class")
                        k = "className";
                    var val = prot[ke];
                    if (val instanceof dfvBind_2.dfvBindDom) {
                        val = bindProt(elem, k, val);
                    }
                    if (k == "bind")
                        return "continue";
                    if (k == "style") {
                        procStyle(elem, val);
                        return "continue";
                    }
                    var old = elem[k];
                    if (typeof old === "function" && typeof val === "function") {
                        elem[k] = function (e) {
                            old.call(elem, e);
                            val.call(elem, e);
                        };
                    }
                    else {
                        if (ele === "select" && ke === "value")
                            value = val;
                        else
                            elem[k] = val;
                    }
                };
                for (var ke in prot) {
                    _loop_1(ke);
                }
            }
            if (arguments.length > 2) {
                for (var i = 2; i < arguments.length; i++) {
                    var args = arguments[i];
                    if (args instanceof dfvBind_2.dfvBindDom) {
                        args = bindInnerHtml(elem, args);
                    }
                    dfvFront_2.dfvFront.addEle(elem, args);
                }
            }
            if (ele === "select" && value != null) {
                elem["value"] = value;
            }
            return elem;
        };
    }
    function procStyle(elem, val) {
        if (typeof val === "string") {
            var styles = (val + "").split(";");
            for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
                var s = styles_1[_i];
                var vals = s.split(":");
                if (vals.length != 2)
                    continue;
                elem.style[dfv_3.dfv.fixNameUpperCase(vals[0], "-", " ")] = vals[1];
            }
            return;
        }
        if (val instanceof Array) {
            for (var _a = 0, val_2 = val; _a < val_2.length; _a++) {
                var v = val_2[_a];
                for (var s in v) {
                    elem.style[s] = procVal(s, v[s]);
                }
            }
            return;
        }
        for (var s in val) {
            elem.style[s] = procVal(s, val[s]);
        }
    }
    function procVal(k, val) {
        return val;
    }
});
define("node_modules/dfv/src/public/dfvWindow", ["require", "exports", "node_modules/dfv/src/public/dfvReact", "node_modules/dfv/src/public/dfvFront"], function (require, exports, React, dfvFront_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dfvWindow = (function () {
        function dfvWindow() {
            var _this = this;
            this.isError = false;
            this.onButtonCancelClick = function () {
                _this.close();
            };
            this.close = function () {
                try {
                    clearInterval(_this.resizeTime);
                    if (!_this.divContent || !_this.dialog) {
                        return;
                    }
                    if (_this.divCover) {
                        try {
                            document.body.removeChild(_this.divCover);
                        }
                        catch (e) {
                        }
                    }
                    _this.divCover = null;
                    _this.divContent = null;
                    var dia_1 = _this.dialog;
                    _this.dialog = null;
                    if (window.history.pushState) {
                        dia_1.className += " anim_out";
                        setTimeout(function () {
                            try {
                                document.body.removeChild(dia_1);
                            }
                            catch (e) {
                            }
                        }, 300);
                    }
                    else {
                        try {
                            document.body.removeChild(dia_1);
                        }
                        catch (e) {
                        }
                    }
                }
                catch (e) {
                    dfvFront_3.dfvFront.onCatchError(e);
                }
            };
            this.reSize = function () {
                if (!_this.dialog || !_this.divContent)
                    return;
                if (_this.dialog.offsetWidth < document.documentElement.clientWidth) {
                    _this.dialog.style.marginLeft = (Math.floor((document.documentElement.clientWidth - _this.dialog.offsetWidth) / 2) | 3) + "px";
                }
                _this.divContent.style.maxWidth = document.documentElement.clientWidth - 40 + "px";
                if (_this.dialog.offsetHeight < document.documentElement.clientHeight) {
                    _this.dialog.style.marginTop = (Math.floor((document.documentElement.clientHeight - _this.dialog.offsetHeight) / 3) | 3) + "px";
                }
                _this.divContent.style.maxHeight = document.documentElement.clientHeight - 45 + "px";
            };
            this.buttonOkText = "确定";
            dfvWindow.coverZ++;
        }
        dfvWindow.prototype.addCover = function () {
            if (!this.divCover) {
                this.divCover = document.createElement("div");
                this.divCover.className = "cover_div cover_black";
                this.divCover.style.zIndex = dfvWindow.coverZ + "";
                document.body.appendChild(this.divCover);
            }
            return this;
        };
        dfvWindow.prototype.procParas = function (para) {
            if (para && para.closeTime > 0) {
                this.autoClose(para.closeTime);
            }
            this.isError = para.isErr;
            if (!para.notCover)
                this.addCover();
            return this;
        };
        dfvWindow.prototype.show = function (title, content) {
            var _this = this;
            if (this.dialog)
                return this;
            var c1 = this.isError ? "ba_tra_red" : "ba_tra_blue";
            var c2 = this.isError ? "icon_err" : "icon_close";
            this.dialog =
                React.createElement("div", { className: "pop_border anim_in " + c1 },
                    this.divContent =
                        React.createElement("div", { className: "pop_cont" },
                            React.createElement("div", { className: "vmid pad5" }, title),
                            content ? React.createElement("div", { style: "margin-top: 10px" }, content) : null),
                    React.createElement("div", { className: "absol_close" },
                        React.createElement("tt", { onclick: function () { return _this.onButtonCancelClick(); }, className: "rotate_hover " + c2 })));
            this.dialog.style.zIndex = (dfvWindow.coverZ + 1) + "";
            document.body.appendChild(this.dialog);
            this.reSize();
            this.resizeTime = setInterval(this.reSize, 200);
            return this;
        };
        dfvWindow.prototype.showWithOk = function (title, content, onOk) {
            this.show(title, this.okWindow(content, onOk));
            return this;
        };
        dfvWindow.prototype.autoClose = function (time) {
            var _this = this;
            if (time === void 0) { time = 3000; }
            setTimeout(function () {
                _this.close();
            }, time);
            return this;
        };
        dfvWindow.prototype.okWindow = function (content, onOk) {
            return (React.createElement("div", null,
                React.createElement("div", null, content),
                React.createElement("div", { class: "h_m" },
                    React.createElement("button", { class: "button_blue pad6-12 mar5t font_0 bold", onclick: function (e) { return onOk(e.currentTarget); } }, this.buttonOkText))));
        };
        dfvWindow.coverZ = 999;
        return dfvWindow;
    }());
    exports.dfvWindow = dfvWindow;
});
define("node_modules/dfv/src/public/dfvFront", ["require", "exports", "node_modules/dfv/src/public/dfvWindow"], function (require, exports, dfvWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HttpType;
    (function (HttpType) {
        HttpType[HttpType["GET"] = 0] = "GET";
        HttpType[HttpType["POST"] = 1] = "POST";
        HttpType[HttpType["DELETE"] = 2] = "DELETE";
        HttpType[HttpType["PUT"] = 3] = "PUT";
    })(HttpType = exports.HttpType || (exports.HttpType = {}));
    exports.LocalName = {
        input: "input",
        button: "button",
        textarea: "textarea",
        select: "select",
        a: "a",
        q: "q",
        div: "div",
        tr: "tr",
        td: "td",
        th: "th",
        tbody: "tbody",
        span: "span",
    };
    exports.InputType = {
        button: "button",
        checkbox: "checkbox",
        file: "file",
        hidden: "hidden",
        password: "password",
        radio: "radio",
        reset: "reset",
        submit: "submit",
        text: "text",
    };
    var dfvFront = (function () {
        function dfvFront() {
        }
        dfvFront.setBody = function (ele) {
            dfvFront.setEle(document.body, ele);
        };
        dfvFront.setEle = function (elem, args) {
            dfvFront.addEle(elem, args, true);
        };
        dfvFront.alert = function (title, cont, ext) {
            if (ext === void 0) { ext = {}; }
            return new dfvWindow_1.dfvWindow().procParas(ext).show(title, cont);
        };
        dfvFront.alertErr = function (title, cont, ext) {
            if (ext === void 0) { ext = {}; }
            ext.isErr = true;
            return new dfvWindow_1.dfvWindow().procParas(ext).show(title, cont);
        };
        dfvFront.msg = function (cont, ext) {
            if (ext === void 0) { ext = {}; }
            if (!window.document) {
                window.alert(cont);
                return;
            }
            if (ext.closeTime === void 0)
                ext.closeTime = 3000;
            return new dfvWindow_1.dfvWindow().procParas(ext).show(cont);
        };
        dfvFront.msgErr = function (cont, ext) {
            if (ext === void 0) { ext = {}; }
            ext.isErr = true;
            return dfvFront.msg(cont, ext);
        };
        dfvFront.loadStop = function () {
            if (!window.document) {
                return;
            }
            var spinner = document.getElementById("load_global");
            if (spinner)
                document.body.removeChild(spinner);
            var cover_div = document.getElementById("load_cover");
            if (cover_div)
                document.body.removeChild(cover_div);
        };
        dfvFront.isLoading = function () {
            return document.getElementsByClassName("spinner").length > 0;
        };
        dfvFront.loadStart = function (coverAll, black, msg) {
            if (!window.document) {
                return;
            }
            dfvFront.loadStop();
            if (!msg) {
                msg = "加载中";
            }
            var ele = document.createElement("div");
            ele.className = "spinner anim_height";
            ele.id = "load_global";
            ele.innerHTML =
                "<div class=\"spinner-container container1\">" +
                    "    <div class=\"circle1\"></div>" +
                    "    <div class=\"circle2\"></div>" +
                    "    <div class=\"circle3\"></div>" +
                    "    <div class=\"circle4\"></div>" +
                    "  </div>" +
                    "  <div class=\"spinner-container container2\">" +
                    "    <div class=\"circle1\"></div>" +
                    "    <div class=\"circle2\"></div>" +
                    "    <div class=\"circle3\"></div>" +
                    "    <div class=\"circle4\"></div>" +
                    "  </div>" +
                    "  <div class=\"spinner-container container3\">" +
                    "    <div class=\"circle1\"></div>" +
                    "    <div class=\"circle2\"></div>" +
                    "    <div class=\"circle3\"></div>" +
                    "    <div class=\"circle4\"></div>" +
                    ("</div><q style='margin-top: 30px'>" + msg + "</q>");
            if (coverAll && !document.getElementById("load_cover")) {
                var cover = document.createElement("div");
                cover.id = "load_cover";
                cover.className = "cover_div";
                if (black)
                    cover.className = "cover_div cover_black";
                document.body.appendChild(cover);
            }
            document.body.appendChild(ele);
        };
        dfvFront.addEle = function (elem, args, clear) {
            if (typeof elem === "string" || typeof elem === "number") {
                elem = document.getElementById(elem + "");
            }
            if (elem == null) {
                return;
            }
            if (clear)
                elem.innerHTML = "";
            if (args == null)
                return;
            if (args instanceof Function) {
                try {
                    args();
                }
                catch (e) {
                    dfvFront.onCatchError(e);
                }
            }
            else if (args instanceof Array) {
                for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
                    var a = args_1[_i];
                    dfvFront.addEle(elem, a);
                }
            }
            else if (args.localName !== void 0) {
                elem.appendChild(args);
            }
            else {
                if (elem.children.length > 0) {
                    elem.appendChild(document.createTextNode(args + ""));
                }
                else {
                    elem.innerHTML += args + "";
                }
            }
        };
        dfvFront.appendJS = function (str, ele) {
            var scriptRegExp = /<script[^>]*>((.|\n|\r)*?(?=<\/script>))<\/script>/ig;
            var result = null;
            while ((result = scriptRegExp.exec(str)) != null) {
                var script = document.createElement("script");
                script.text = result[1];
                ele.appendChild(script);
            }
        };
        dfvFront.classRemove = function (ele, name) {
            var res = ele.className.split(" ");
            var newClass = "";
            for (var c in res) {
                if (res[c] == name)
                    continue;
                else
                    newClass += res[c] + " ";
            }
            ele.className = newClass;
        };
        dfvFront.scrollToTop = function () {
            window.scrollTo(window.scrollX, 0);
        };
        dfvFront.setFocus = function (sel, start, end) {
            if (sel.setSelectionRange) {
                sel.focus();
                sel.setSelectionRange(start, end);
            }
            else if (sel.createTextRange) {
                var range = sel.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        };
        dfvFront.setFocusEnd = function (sel) {
            var length = sel.value.length;
            dfvFront.setFocus(sel, length, length);
        };
        dfvFront.eachElement = function (eleme, callback) {
            var elem = eleme;
            if (typeof eleme === "string") {
                elem = document.getElementById(eleme + "");
            }
            else if (typeof eleme === "number") {
                elem = document.getElementById(eleme + "");
            }
            if (eleme == null)
                return;
            var eleList = [];
            for (;;) {
                for (var i = 0; i < elem.children.length; i++) {
                    var e = elem.children[i];
                    if (callback(e) === false)
                        return;
                    if (!e.children)
                        continue;
                    if (e.children.length > 0) {
                        eleList.push(e);
                    }
                }
                if (eleList.length == 0)
                    return;
                elem = eleList.pop();
            }
        };
        dfvFront.objToForm = function (obj) {
            var ret = "";
            for (var k in obj) {
                ret += k + "=" + encodeURIComponent(obj[k]) + "&";
            }
            if (ret.length > 0)
                return ret.substr(0, ret.length - 1);
            return ret;
        };
        dfvFront.onCatchError = function (err) {
            dfvFront.msgErr(err + "", { closeTime: 5 * 1000 });
            console.error(err);
        };
        return dfvFront;
    }());
    exports.dfvFront = dfvFront;
});
define("front/AjaxRequest", ["require", "exports", "node_modules/dfv/src/public/dfvFront", "node_modules/dfv/src/public/dfv"], function (require, exports, dfvFront_4, dfv_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AjaxRequest = (function () {
        function AjaxRequest(url, clas) {
            this.url = url;
            this.clas = clas;
            this.http = new XMLHttpRequest();
            this.failedMsg = true;
            this.loadProgress = true;
            this.paraObj = null;
            this.notPost = false;
            this.onSendProg = function (ev) {
            };
            this.onRespProg = function (ev) {
            };
            try {
                this.http.timeout = 15 * 1000;
            }
            catch (e) {
            }
        }
        AjaxRequest.prototype.setContentTypeJSON = function () {
            this.http.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            return this;
        };
        AjaxRequest.prototype.setContentTypeForm = function () {
            this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
            return this;
        };
        AjaxRequest.prototype.msgProgress = function (enable) {
            this.failedMsg = enable;
            this.loadProgress = enable;
            return this;
        };
        AjaxRequest.prototype.showMsg = function (enable) {
            this.failedMsg = enable;
            return this;
        };
        AjaxRequest.prototype.showProgress = function (enable) {
            this.loadProgress = enable;
            return this;
        };
        AjaxRequest.prototype.resp = function () {
            var _this = this;
            if (this.loadProgress)
                dfvFront_4.dfvFront.loadStart();
            return new Promise(function (reso, reject) {
                _this.procRes(function (res) {
                    if (_this.loadProgress) {
                        dfvFront_4.dfvFront.loadStop();
                    }
                    var resp = null;
                    var err = null;
                    if (res.status == 200) {
                        resp = JSON.parse(res.responseText);
                        if (_this.clas)
                            dfv_4.dfv.setPrototypeOf(resp, _this.clas.prototype);
                    }
                    else {
                        if (res.responseText && res.responseText.length > 0)
                            err = Error(res.responseText);
                        else
                            err = Error(res.status + "网络异常!");
                    }
                    if (res.status == 200) {
                        reso(resp);
                    }
                    else {
                        if (_this.failedMsg) {
                            dfvFront_4.dfvFront.msgErr(err.message);
                        }
                        reject(resp);
                    }
                });
                _this.httpSend();
            });
        };
        AjaxRequest.prototype.httpSend = function () {
            if (this.notPost) {
                if (this.paraObj)
                    this.http.open("GET", this.url + "?" + dfvFront_4.dfvFront.objToForm(this.paraObj), true);
                else
                    this.http.open("GET", this.url, true);
                this.http.send(null);
            }
            else {
                this.http.open("POST", this.url, true);
                this.setContentTypeJSON();
                this.http.send(JSON.stringify(this.paraObj));
            }
        };
        AjaxRequest.prototype.sendJSON = function (obj, notPost) {
            if (obj) {
                if (!this.paraObj) {
                    this.paraObj = {};
                }
                for (var key in obj) {
                    this.paraObj[key] = obj[key];
                }
            }
            this.notPost = !!notPost;
            return this;
        };
        AjaxRequest.prototype.get = function (onRes) {
            this.procRes(onRes);
            this.http.open("GET", this.url, true);
            return this;
        };
        AjaxRequest.prototype.post = function (val, onRes) {
            this.procRes(onRes);
            this.http.open("POST", this.url, true);
            this.http.send(val);
            return this;
        };
        AjaxRequest.prototype.procRes = function (onRes) {
            var _this = this;
            this.http.onreadystatechange = function (ev) {
                if (_this.http.readyState == 4) {
                    if (onRes) {
                        try {
                            onRes(_this.http);
                        }
                        catch (e) {
                            dfvFront_4.dfvFront.onCatchError(e);
                        }
                    }
                }
            };
            this.http.onprogress = this.onRespProg;
            this.http.upload.onprogress = this.onSendProg;
        };
        return AjaxRequest;
    }());
    exports.AjaxRequest = AjaxRequest;
});
define("front/LoadEvent", ["require", "exports", "node_modules/dfv/src/public/dfv", "node_modules/dfv/src/public/dfvFront"], function (require, exports, dfv_5, dfvFront_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoadEvent = (function () {
        function LoadEvent(dat, type) {
            this.type = LoadEvent.funcEvent;
            this.dat = "";
            this.dat = dat;
            this.type = type;
        }
        LoadEvent.pushFunc = function (func, url) {
            if (window.history.state == null) {
                LoadEvent.replaceFunc(func);
                return;
            }
            if (url == null) {
                url = "#" + dfv_5.dfv.getUniqueId16();
            }
            try {
                func();
                if (url && window.history.pushState)
                    window.history.pushState(LoadEvent.func(func), "", url);
            }
            catch (e) {
                dfvFront_5.dfvFront.onCatchError(e);
            }
        };
        LoadEvent.func = function (func) {
            var id = dfv_5.dfv.getUniqueId16();
            LoadEvent.funcMap[id] = func;
            return new LoadEvent(id, LoadEvent.funcEvent);
        };
        LoadEvent.newBody = function (dat) {
            return new LoadEvent(dat, LoadEvent.loadBodyEvent);
        };
        LoadEvent.procLoadEvent = function (dat) {
            if (dat.type > LoadEvent.invalid && dat.type < LoadEvent.procArr.length) {
                LoadEvent.procArr[dat.type](dat);
            }
        };
        LoadEvent.replaceFunc = function (func) {
            try {
                func();
                if (window.history.replaceState)
                    window.history.replaceState(LoadEvent.func(func), "");
            }
            catch (e) {
                dfvFront_5.dfvFront.onCatchError(e);
            }
        };
        LoadEvent.invalid = 0;
        LoadEvent.funcEvent = 1;
        LoadEvent.loadBodyEvent = 2;
        LoadEvent.funcMap = {};
        LoadEvent.procArr = [];
        return LoadEvent;
    }());
    exports.LoadEvent = LoadEvent;
    if (typeof window !== "undefined") {
        window.onpopstate = function (ev) {
            if (ev.state) {
                ev.state.isPopState = true;
                LoadEvent.procLoadEvent(ev.state);
            }
        };
        LoadEvent.procArr[LoadEvent.funcEvent] = function (d) {
            try {
                var func = LoadEvent.funcMap[d.dat];
                if (func)
                    func();
            }
            catch (e) {
                dfvFront_5.dfvFront.onCatchError(e);
            }
        };
        LoadEvent.procArr[LoadEvent.loadBodyEvent] = function (d) {
            window.document.body.innerHTML = "";
            dfvFront_5.dfvFront.addEle(window.document.body, d.dat);
            if (!d.isPopState)
                dfvFront_5.dfvFront.scrollToTop();
        };
    }
});
define("front/ObjStorage", ["require", "exports", "node_modules/dfv/src/public/dfv"], function (require, exports, dfv_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ObjStorage = (function () {
        function ObjStorage(clas) {
            this.clas = clas;
            this._key = dfv_6.dfv.getFuncName(this.clas) + "_ObjStorage";
        }
        Object.defineProperty(ObjStorage.prototype, "dat", {
            get: function () {
                if (this._dat == null) {
                    this.read();
                }
                return this._dat;
            },
            set: function (dat) {
                this._dat = dat;
            },
            enumerable: true,
            configurable: true
        });
        ObjStorage.prototype.save = function () {
            if (this._dat != null)
                localStorage[this._key] = JSON.stringify(this._dat);
        };
        ObjStorage.prototype.read = function () {
            var local = localStorage[this._key];
            if (local) {
                this._dat = JSON.parse(local);
                dfv_6.dfv.setPrototypeOf(this._dat, this.clas);
            }
            else {
                this._dat = new this.clas();
            }
        };
        ObjStorage._count = 0;
        return ObjStorage;
    }());
    exports.ObjStorage = ObjStorage;
});
