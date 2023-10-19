"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.passwordHashed = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
function passwordHashed(password) {
    const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
    return hashedPassword;
}
exports.passwordHashed = passwordHashed;
function comparePassword(password, hashPassword) {
    const hashedPassword = bcrypt_1.default.compareSync(password, hashPassword);
    return hashedPassword;
}
exports.comparePassword = comparePassword;
