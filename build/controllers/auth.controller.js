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
exports.loginController = exports.registerController = void 0;
const validation_1 = require("./../validation/validation");
const cloudinary_1 = require("./../services/cloudinary");
const user_model_1 = __importDefault(require("../models/user/user.model"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.files[0];
    try {
        const { error } = validation_1.registerValidation({
            login: req.body.login,
            password: req.body.password,
            avatar: req.files[0],
        });
        if (error)
            return res.status(400).send(error.details[0].message);
        const loginExist = yield user_model_1.default.findOne({ login: req.body.login });
        if (loginExist)
            return res.status(400).send('Login already exists');
        const result = yield cloudinary_1.uploadPicture(image.buffer, req.body.name);
        const newUser = new user_model_1.default({
            login: req.body.login,
            password: req.body.password,
            //@ts-ignore
            avatar: result.eager[0].secure_url,
        });
        yield newUser.save();
        res.status(200).json({
            status: 'ok',
            message: 'Registered',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Could not register',
        });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findAndValidateUser(req.body);
        const payload = { _id: user._id };
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, {
            expiresIn: '48h',
        });
        res.status(200).json({ status: 'ok', token });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
});
exports.loginController = loginController;
//# sourceMappingURL=auth.controller.js.map