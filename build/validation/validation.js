"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        login: joi_1.default.string().min(2).required(),
        password: joi_1.default.string().min(2).required(),
        avatar: joi_1.default.required(),
    });
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
// const loginValidation = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().min(5).required().email(),
//     password: Joi.string().min(6).required(),
//   })
//   return schema.validate(data)
// }
// module.exports.registerValidation = registerValidation
// module.exports.loginValidation = loginValidation
//# sourceMappingURL=validation.js.map