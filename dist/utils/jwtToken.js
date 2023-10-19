"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
function jwtToken(res, user, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME });
        return res.status(200).send({ message: message, user: user, token: token });
    });
}
exports.jwtToken = jwtToken;
function verifyToken(res, token) {
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        return __awaiter(this, void 0, void 0, function* () {
            // if token is invalid or empty execute this condition
            if (err) {
                return res.status(403).send({ message: 'Invalid Token' });
            }
            const user = yield index_1.default.user.findFirst({ where: { id: decoded === null || decoded === void 0 ? void 0 : decoded.id } });
            // if id is invalid or empty execute this condition
            if (!user) {
                return res.status(404).send({ message: "Invalid User" });
            }
            return res.status(200).send({ message: "Load User Successfully", user: user });
        });
    });
}
exports.verifyToken = verifyToken;
