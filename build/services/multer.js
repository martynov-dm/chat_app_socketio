"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const uploader = multer_1.default({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only images are allowed'));
        }
    },
});
exports.default = uploader;
//# sourceMappingURL=multer.js.map