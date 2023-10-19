"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send({ message: err.message || 'Internal Server Error' });
}
exports.errorHandler = errorHandler;
