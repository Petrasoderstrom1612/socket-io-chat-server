"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_MESSAGES = exports.MESSAGE_TYPES = exports.USERS = void 0;
exports.USERS = [
    { user: { "id": 1, "username": "Constantin", "color": "#79E296" }, "ttl": 10 },
    { user: { "id": 2, "username": "Jervis", "color": "#3261B1" }, "ttl": 4 },
    { user: { "id": 3, "username": "Judye", "color": "#650C10" }, "ttl": 14 },
    { user: { "id": 4, "username": "Veradis", "color": "#B79335" }, "ttl": 5 },
    { user: { "id": 5, "username": "Germaine", "color": "#402558" }, "ttl": 4 },
    { user: { "id": 6, "username": "Elyssa", "color": "#5BF900" }, "ttl": 5 },
    { user: { "id": 7, "username": "Jayne", "color": "#00B22E" }, "ttl": 10 },
    { user: { "id": 8, "username": "Timmie", "color": "#618594" }, "ttl": 3 },
    { user: { "id": 9, "username": "Cal", "color": "#E5F8CE" }, "ttl": 8 },
    { user: { "id": 10, "username": "Freeman", "color": "#DD8112" }, "ttl": 4 }
];
exports.MESSAGE_TYPES = {
    "USER_JOINED": "USER_JOINED",
    "USER_LEFT": "USER_LEFT",
    "USER_MESSAGE": "USER_MESSAGE",
};
// A list of 100 non repeating user messages
exports.USER_MESSAGES = [
    "Hello",
    "Hi",
    "Hey",
    "Whats up?",
    "Whats going on?",
    "Whats new?",
    "Whats happening?"
];
