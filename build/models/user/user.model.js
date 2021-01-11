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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    login: {
        type: String,
        required: true,
        min: 2,
        max: 15,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 3,
        select: false,
    },
    avatar: {
        type: String,
        required: true,
    },
    currentRoomId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' },
    currentServerEndpoint: { type: String },
}, {
    timestamps: true,
});
UserSchema.set('toJSON', {
    virtuals: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = bcryptjs_1.default.hashSync(this.password);
        return next();
    });
});
UserSchema.methods.passwordMatches = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compareSync(password, this.password);
    });
};
UserSchema.statics.findAndValidateUser = function ({ login, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ login })
            .select('+password -__v -createdAt -updatedAt')
            .exec();
        if (!user) {
            throw new Error('Login not found');
        }
        const isPasswordOk = yield user.passwordMatches(password);
        if (!isPasswordOk) {
            throw new Error('Password is not valid');
        }
        const JsonUser = user.toJSON();
        delete JsonUser.password;
        return JsonUser;
    });
};
const User = mongoose_1.default.model('Users', UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map