"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// var GoogleStrategy = require('passport-google-oauth20').Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '564657726979-9bvrbufpm8g51j9jnrqbeu9k8vd2b7q1.apps.googleusercontent.com',
    clientSecret: 'Wq6Q8t-Cy_mgjSHqCN1DAjm5',
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
}, function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}));
//# sourceMappingURL=passport-setup.js.map