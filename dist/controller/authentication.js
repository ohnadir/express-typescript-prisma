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
exports.loadUser = exports.login = exports.registration = void 0;
const index_1 = __importDefault(require("../config/index"));
const uuid_1 = require("uuid");
const convertNumber_1 = __importDefault(require("../utils/convertNumber"));
const passwordHashed_1 = require("../utils/passwordHashed");
const jwtToken_1 = require("../utils/jwtToken");
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, name, password, address } = req.body;
        // Check if the email exists
        const isEmailExist = yield index_1.default.user.findFirst({ where: { email: email } });
        if (isEmailExist) {
            return res.status(404).send({ message: "Email already taken" });
        }
        // Check if the phone number exists
        const isPhoneExist = yield index_1.default.user.findFirst({ where: { phone: phone } });
        if (isPhoneExist) {
            return res.status(404).send({ message: "Phone Number already taken" });
        }
        const hashedPassword = yield (0, passwordHashed_1.passwordHashed)(password);
        // Create a new user
        const newUser = yield index_1.default.user.create({
            data: {
                id: Number((0, convertNumber_1.default)((0, uuid_1.v4)())),
                email,
                phone,
                name,
                password: hashedPassword,
                address
            }
        });
        // create jwt token for user authentication
        (0, jwtToken_1.jwtToken)(res, newUser, "Registration Successfully");
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.registration = registration;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by their email
        const user = yield index_1.default.user.findFirst({ where: { email: email } });
        if (!user) {
            return res.status(404).send({ message: "Invalid User" });
        }
        // check the password is match or not
        const validPass = yield (0, passwordHashed_1.comparePassword)(password, user.password);
        if (!validPass) {
            return res.status(404).send({ message: "Incorrect Credential" });
        }
        // create jwt token for user authentication
        (0, jwtToken_1.jwtToken)(res, user, "Login Successfully");
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.login = login;
const loadUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(401).send({ message: "Your token is expired. Please login again" });
        }
        (0, jwtToken_1.verifyToken)(res, token);
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.loadUser = loadUser;
