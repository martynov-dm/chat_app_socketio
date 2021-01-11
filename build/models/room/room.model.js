"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = exports.RoomSchema = void 0;
const message_model_1 = require("./../message/message.model");
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
exports.RoomSchema = new mongoose_1.Schema({
    roomTitle: { type: String, require: true, max: 20, min: 1 },
    server: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Server', required: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// RoomSchema.virtual('userCount').get(function (this: IRoom) {
//   return this.users.length
// })
/// Virtual Populate
exports.RoomSchema.virtual('messages', {
    ref: message_model_1.MessageModel,
    localField: '_id',
    foreignField: 'room',
    options: { select: '-__v' },
});
exports.RoomSchema.virtual('users', {
    ref: user_model_1.default,
    localField: '_id',
    foreignField: 'room',
    options: { select: '-__v' },
});
// RoomSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'messages',
//   }).populate({
//     path: 'users',
//   })
//   next()
// })
exports.RoomModel = mongoose_1.default.model('Room', exports.RoomSchema);
//# sourceMappingURL=room.model.js.map