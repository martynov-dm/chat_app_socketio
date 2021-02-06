"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(roomId, roomTitle, namespace, isPrivate = false) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.isPrivate = isPrivate;
        this.history = [];
    }
    addMessage(message) {
        this.history.push(message);
    }
    clearHistory() {
        this.history = [];
    }
}
exports.default = Room;
//# sourceMappingURL=Room.js.map