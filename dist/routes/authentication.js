"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const authentication_1 = require("../controller/authentication");
exports.router.post('/signup', authentication_1.registration);
exports.router.post('/login', authentication_1.login);
exports.router.get('/:token', authentication_1.loadUser);
