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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerModel = exports.ServerSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const room_model_1 = require("./../room/room.model");
exports.ServerSchema = new mongoose_1.Schema({
    title: { type: String, required: true, max: 15, min: 1, unique: true },
    image: { type: String, required: true, min: 1 },
    endpoint: { type: String, required: true, unique: true, min: 1, max: 20 },
    isPrivate: { type: Boolean, require: true },
    type: { type: String, require: true },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.ServerSchema.virtual('rooms', {
    ref: room_model_1.RoomModel,
    localField: '_id',
    foreignField: 'server',
    options: { select: '-__v' },
});
exports.ServerSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'rooms',
    });
    next();
});
exports.ServerSchema.statics.getServersArr = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const serversList = yield this.find({}, '_id title image endpoint isPrivate')
            .lean()
            .exec();
        return serversList;
    });
};
// ServerSchema.statics.findAndPopulateCurrentServer = async function (
//   endpoint: string
// ): Promise<IServer> {
//   const currentServer = await this.findOne({ endpoint })
//     .populate({
//       path: 'rooms',
//       populate: {
//         path: 'history',
//         model: MessageModel,
//         populate: {
//           path: 'user',
//           model: User,
//         },
//       },
//     })
//     .lean()
//     .exec()
//   // console.log(currentServer.rooms[2].history)
//   // currentServer.rooms[0].history.populate().exec()
//   return currentServer
// }
exports.ServerSchema.statics.getEndpoints = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const serversList = yield this.find().lean().exec();
        return serversList.map((server) => server.endpoint);
    });
};
exports.ServerModel = mongoose_1.default.model('Server', exports.ServerSchema);
//# sourceMappingURL=server.model.js.map