"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uuidToNumber(uuid) {
    const number = uuid.replace(/[^0-9]/g, '');
    return number;
}
exports.default = uuidToNumber;
