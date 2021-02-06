"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Bring in the room class
const NameSpace_1 = __importDefault(require("../classes/NameSpace"));
const Room_1 = __importDefault(require("../classes/Room"));
// Set up the namespaces
const namespaces = [];
const wikiNs = new NameSpace_1.default(0, 'Wiki', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png', '/wiki');
const mozNs = new NameSpace_1.default(1, 'Mozilla', 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png', '/mozilla');
const linuxNs = new NameSpace_1.default(2, 'Linux', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png', '/linux');
// Make the main room and add it to rooms. it will ALWAYS be 0
wikiNs.addRoom(new Room_1.default(0, 'New Articles', 'Wiki'));
wikiNs.addRoom(new Room_1.default(1, 'Editors', 'Wiki'));
wikiNs.addRoom(new Room_1.default(2, 'Other', 'Wiki'));
mozNs.addRoom(new Room_1.default(0, 'Firefox', 'Mozilla'));
mozNs.addRoom(new Room_1.default(1, 'SeaMonkey', 'Mozilla'));
mozNs.addRoom(new Room_1.default(2, 'SpiderMonkey', 'Mozilla'));
mozNs.addRoom(new Room_1.default(3, 'Rust', 'Mozilla'));
linuxNs.addRoom(new Room_1.default(0, 'Debian', 'Linux'));
linuxNs.addRoom(new Room_1.default(1, 'Red Hat', 'Linux'));
linuxNs.addRoom(new Room_1.default(2, 'MacOs', 'Linux'));
linuxNs.addRoom(new Room_1.default(3, 'Kernal Development', 'Linux'));
namespaces.push(wikiNs, mozNs, linuxNs);
exports.default = namespaces;
//# sourceMappingURL=data.js.map