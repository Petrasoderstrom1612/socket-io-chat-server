import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


import {MESSAGE_TYPES, USERS, USER_MESSAGES, UserType} from './constants';


io.on('connection', (socket) => {
  console.log(`a user connected; socket_id: ${socket.id}`);
});

io.on('disconnect', (socket) => {
  console.log(`a user disconnected; socket_id: ${socket.id}`);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

const active_users : UserType[] = [];
let current_interval = 0;
const interval = setInterval(() => {
  current_interval++;
  if(current_interval % 6 === 0) {
    const user = USERS[Math.floor(Math.random() * USERS.length)];
    active_users.push(user);
    io.emit(MESSAGE_TYPES.USER_JOINED, '', user.user);
    return;
  }

  active_users.forEach(user => {
    const message = USER_MESSAGES[Math.floor(Math.random() * USER_MESSAGES.length)];
    user.ttl--;
    io.emit(MESSAGE_TYPES.USER_MESSAGE, message, user.user);
  });

  active_users.forEach(user => {
    if (user.ttl <= 0) {
      active_users.splice(active_users.indexOf(user), 1);
      io.emit(MESSAGE_TYPES.USER_LEFT, '', user.user);
    }
  });

}, 1000);
