"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_model_1 = __importDefault(require("../models/user/user.model"));
const cookieExtractor = (req) => {
    return req && req.cookies && req.cookies.token;
};
const jwtOptions = {
    secretOrKey: config_1.default.jwtSecret,
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromExtractors([cookieExtractor]),
};
const jwtStrategy = new passport_jwt_1.default.Strategy(jwtOptions, (jwtPayload, done) => {
    user_model_1.default.findById(jwtPayload.uid, (err, user) => {
        if (err) {
            return done(err, null);
        }
        if (user) {
            return done(err, user);
        }
        return done(null, false);
    });
});
exports.default = jwtStrategy;
//# sourceMappingURL=passport.js.map