"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPicture = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudName,
    api_key: config_1.default.cloudApiKey,
    api_secret: config_1.default.cloudApiSecret,
});
const uploadPicture = (image, login) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder: 'chat_app_avatars',
            use_filename: true,
            public_id: login,
            format: 'png',
            eager: [{ width: 200, height: 200, crop: 'scale', radius: 'max' }],
        };
        cloudinary_1.v2.uploader
            .upload_stream(uploadOptions, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        })
            .end(image);
    });
};
exports.uploadPicture = uploadPicture;
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map