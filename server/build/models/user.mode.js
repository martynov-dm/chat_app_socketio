"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    login: {
        type: String,
        required: true,
        min: 2,
        max: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    profileImageUrl: String,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('users', userSchema);
//# sourceMappingURL=user.mode.js.map