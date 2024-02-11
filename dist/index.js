"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
const PORT = process.env.PORT || 3000;
const AUTH_USER = {
    user: {
        id: 999,
        username: "AUTHENTICATED_WEB_USER",
        color: "#D7D804",
    },
    ttl: 0,
};
const constants_1 = require("./constants");
console.log('Starting server...');
app.get('/health', (req, res) => {
    res.send('OK');
    res.sendStatus(200);
});
io.on('connection', (socket) => {
    socket.on(constants_1.MESSAGE_TYPES.USER_MESSAGE, (data) => {
        console.log(`message: ${data};`);
        io.emit(constants_1.MESSAGE_TYPES.USER_MESSAGE, data, AUTH_USER.user);
    });
    console.log(`a user connected; socket_id: ${socket.id}`);
    io.emit(constants_1.MESSAGE_TYPES.USER_JOINED, '', AUTH_USER.user);
});
io.on('disconnect', (socket) => {
    console.log(`a user disconnected; socket_id: ${socket.id}`);
    io.emit(constants_1.MESSAGE_TYPES.USER_LEFT, '', socket.id);
});
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
const active_users = [];
let current_interval = 0;
const interval = setInterval(() => {
    current_interval++;
    if (current_interval % 6 === 0) {
        const user = constants_1.USERS[Math.floor(Math.random() * constants_1.USERS.length)];
        active_users.push(user);
        io.emit(constants_1.MESSAGE_TYPES.USER_JOINED, '', user.user);
        return;
    }
    active_users.forEach(user => {
        const message = constants_1.USER_MESSAGES[Math.floor(Math.random() * constants_1.USER_MESSAGES.length)];
        user.ttl--;
        io.emit(constants_1.MESSAGE_TYPES.USER_MESSAGE, message, user.user);
    });
    active_users.forEach(user => {
        if (user.ttl <= 0) {
            active_users.splice(active_users.indexOf(user), 1);
            io.emit(constants_1.MESSAGE_TYPES.USER_LEFT, '', user.user);
        }
    });
}, 1000);
