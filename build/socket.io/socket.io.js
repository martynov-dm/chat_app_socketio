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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenToSocketEndPoints = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const message_model_1 = require("./../models/message/message.model");
const room_model_1 = require("./../models/room/room.model");
const server_model_1 = require("../models/server/server.model");
const user_model_1 = __importDefault(require("../models/user/user.model"));
const config_1 = __importDefault(require("../config"));
let userData;
const ListenToSocketEndPoints = (io) => __awaiter(void 0, void 0, void 0, function* () {
    const serversArr = yield server_model_1.ServerModel.getServersArr();
    io.of('/').on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        socket.on('authenticate', (token) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const decodedData = yield jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
                //@ts-ignore
                userData = yield user_model_1.default.findById(
                //@ts-ignore
                decodedData._id, '_id login avatar currentRoomId currentServerEndpoint').lean();
                const initialData = {
                    serversArr,
                    userData,
                };
                socket.emit('authorized', initialData);
            }
            catch (error) {
                socket.emit('not authorized');
            }
        }));
    }));
    serversArr.forEach((server) => {
        io.of(server.endpoint).on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
            const currentServerDataFull = yield server_model_1.ServerModel.findOne({ endpoint: server.endpoint }, '_id title image endpoint type rooms').lean();
            const { rooms } = currentServerDataFull, serverData = __rest(currentServerDataFull, ["rooms"]);
            socket.emit('currentServerData', serverData);
            socket.emit('currentServerRoomsArr', rooms);
            yield user_model_1.default.findByIdAndUpdate(userData._id, {
                $set: { currentServerEndpoint: server.endpoint },
            }, { new: true }, 
            //@ts-ignore
            (err, user) => (userData = user));
            //@ts-ignore
            socket['userData'] = userData;
            if (rooms.some((room) => {
                JSON.stringify(room._id) == JSON.stringify(userData.currentRoomId);
            })) {
                const initialRoomId = userData.currentRoomId;
                joinRoom(userData._id, initialRoomId, socket, server.endpoint, io);
            }
            else {
                const initialRoomId = rooms[0]._id;
                joinRoom(userData._id, initialRoomId, socket, server.endpoint, io);
            }
            socket.on('changeRoom', (newRoomId) => __awaiter(void 0, void 0, void 0, function* () {
                const currentRoomId = userData.currentRoomId;
                joinRoom(userData._id, newRoomId, socket, server.endpoint, io);
                leaveRoom(currentRoomId, io, server.endpoint, socket);
            }));
            socket.on('addRoom', (newRoomTitle) => __awaiter(void 0, void 0, void 0, function* () {
                const newRoom = new room_model_1.RoomModel({
                    roomTitle: newRoomTitle,
                    server: server._id,
                });
                newRoom.save((err, doc) => {
                    io.of(server.endpoint).emit('addRoom', doc);
                });
            }));
            socket.on('newMessageToServer', ({ message, userId, roomId, }) => __awaiter(void 0, void 0, void 0, function* () {
                const newMessage = yield new message_model_1.MessageModel({
                    text: message,
                    user: userId,
                    room: roomId,
                });
                yield newMessage.save((error, newMessageDoc) => message_model_1.MessageModel.populate(newMessageDoc, { path: 'user', model: user_model_1.default }, (err, savedAndPopulatedMessage) => io
                    .of(server.endpoint)
                    .to(roomId)
                    .emit('savedMessage', savedAndPopulatedMessage)));
            }));
            socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
                const SocketsInRoomArr = Array.from((yield io
                    .of(server.endpoint)
                    .in(userData.currentRoomId.toString())
                    .allSockets()).values());
                const usersArr = SocketsInRoomArr.map((socket) => 
                //@ts-ignore
                io.of(server.endpoint).sockets.get(socket).userData);
                const filteredUsersArr = usersArr.filter((user, index, thisArray) => thisArray.findIndex((user2) => user2.login === user.login) === index);
                yield io
                    .of(server.endpoint)
                    .in(userData.currentRoomId.toString())
                    .emit('usersUpdate', filteredUsersArr);
            }));
        }));
    });
});
exports.ListenToSocketEndPoints = ListenToSocketEndPoints;
const leaveRoom = (oldRoomId, io, endpoint, socket) => __awaiter(void 0, void 0, void 0, function* () {
    yield socket.leave(oldRoomId.toString());
    const SocketsInRoomArr = Array.from((yield io.of(endpoint).in(oldRoomId.toString()).allSockets()).values());
    const usersArr = SocketsInRoomArr.map((socket) => 
    //@ts-ignore
    io.of(endpoint).sockets.get(socket).userData);
    const filteredUsersArr = usersArr.filter((user, index, thisArray) => thisArray.findIndex((user2) => user2.login === user.login) === index);
    yield io
        .of(endpoint)
        .to(userData.currentRoomId.toString())
        .emit('usersUpdate', filteredUsersArr);
});
const joinRoom = (userId, roomId, socket, endpoint, io) => __awaiter(void 0, void 0, void 0, function* () {
    const roomDataFull = yield room_model_1.RoomModel.findById(roomId)
        .populate({
        path: 'messages',
    })
        .lean();
    const { messages } = roomDataFull, roomData = __rest(roomDataFull, ["messages"]);
    yield socket.emit('currentRoomData', roomData);
    yield socket.emit('currentRoomMessages', messages);
    yield socket.join(roomId.toString());
    const SocketsInRoomArr = Array.from((yield io.of(endpoint).in(roomId.toString()).allSockets()).values());
    const usersArr = SocketsInRoomArr.map((socket) => 
    //@ts-ignore
    io.of(endpoint).sockets.get(socket).userData);
    console.log('bef filter', usersArr);
    const filteredUsersArr = usersArr.filter((user, index, thisArray) => thisArray.findIndex((user2) => user2.login === user.login) === index);
    console.log('after filter', filteredUsersArr);
    yield socket.emit('usersUpdate', filteredUsersArr);
    yield socket.to(roomId.toString()).emit('usersUpdate', filteredUsersArr);
    yield user_model_1.default.findByIdAndUpdate(userId, {
        $set: { currentRoomId: roomId },
    }, { new: true }, (err, user) => {
        //@ts-ignore
        userData = user;
    });
});
//# sourceMappingURL=socket.io.js.map