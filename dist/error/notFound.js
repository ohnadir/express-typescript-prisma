"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_1 = require("./http");
class NotFoundError extends http_1.HttpError {
    constructor(message, code) {
        super(code, message);
    }
}
exports.NotFoundError = NotFoundError;
