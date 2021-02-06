"use strict";
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
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
let database;
const connect = (mongoURL = config_1.default.mongoURL) => {
    if (database) {
        return;
    }
    mongoose_1.default.connect(mongoURL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose_1.default.connection;
    database.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Connected to database');
    }));
    database.on('error', () => {
        console.log('Error connecting to database');
    });
};
exports.connect = connect;
const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose_1.default.disconnect();
};
exports.disconnect = disconnect;
//# sourceMappingURL=mongoose.js.map