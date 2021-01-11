"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const serve_static_1 = __importDefault(require("serve-static"));
const socket_io_2 = require("./socket.io/socket.io");
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = require("./services/mongoose");
const passport_2 = __importDefault(require("./services/passport"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const server = http_1.default.createServer(app);
app.use(cors_1.default());
passport_1.default.initialize();
passport_1.default.use('jwt', passport_2.default);
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookie_parser_1.default());
if (process.env.NODE_ENV === 'production') {
    app.use(serve_static_1.default(__dirname + '../client/build'));
}
mongoose_1.connect();
app.use('/api/auth', auth_1.default);
server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
exports.io = new socket_io_1.Server(server, {
    cookie: false,
    serveClient: false,
    cors: {
        origin: '*',
    },
});
socket_io_2.ListenToSocketEndPoints(exports.io);
//# sourceMappingURL=index.js.map