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
exports.delete_user = exports.change_password = exports.user = exports.users = exports.updateProfile = void 0;
const index_1 = __importDefault(require("../config/index"));
const utils_1 = require("../utils");
// controller for update users field
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address } = req.body;
        // check user of the existing user in database
        const user = yield index_1.default.user.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!user) {
            return res.status(422).send({ message: "Incorrect credential" });
        }
        // Check if the email exists
        let isEmailExist;
        if (email !== undefined) {
            isEmailExist = yield index_1.default.user.findUnique({ where: { email: email } });
        }
        if (isEmailExist) {
            return res.status(404).send({ message: "Email already taken" });
        }
        // Check if the phone number exists
        let isPhoneExist;
        if (phone !== undefined) {
            isPhoneExist = yield index_1.default.user.findUnique({ where: { phone: phone } });
        }
        if (isPhoneExist) {
            return res.status(404).send({ message: "Phone Number already taken" });
        }
        // Update the profile information by condition
        const update_user = yield index_1.default.user.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: name && user.name === name ? user.name : name,
                phone: phone && user.phone === phone ? user.phone : phone,
                email: email && user.email === email ? user.email : email,
                address: address && user.address === address ? user.address : address
            },
        });
        res.status(200).send({ message: "update Successfully", user: update_user });
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.updateProfile = updateProfile;
// controller for get all users
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check user of the existing user in database
        const users = yield index_1.default.user.findMany();
        if (!users) {
            return res.status(404).send({ message: "No User found this moment" });
        }
        res.status(200).send({ message: "Fetch All Users", users: users });
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.users = users;
// controller for get user
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check user by id of the existing user in database
        const user = yield index_1.default.user.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!user) {
            return res.status(404).send({ message: "No User found by this ID" });
        }
        res.status(200).send({ message: "Fetch User", user: user });
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.user = user;
// controller for change password
const change_password = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        // check user by id of the existing user in database
        const user = yield index_1.default.user.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!user) {
            return res.status(404).send({ message: "No User found by this id" });
        }
        // hash new password
        const hashedPassword = yield (0, utils_1.passwordHashed)(password);
        // updated password
        const update_user = yield index_1.default.user.update({
            where: { id: parseInt(req.params.id) },
            data: {
                password: hashedPassword && hashedPassword
            },
        });
        res.status(200).send({ message: "update Successfully", user: update_user });
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.change_password = change_password;
// controller for get user
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check user by id of the existing user in database
        const user = yield index_1.default.user.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!user) {
            return res.status(404).send({ message: "No User found by this ID" });
        }
        yield index_1.default.user.delete({ where: { id: parseInt(req.params.id) } });
        res.status(200).send({ message: "Delete User" });
    }
    catch (error) {
        return res.status(500).send({ message: "Server Error. Try again" });
    }
});
exports.delete_user = delete_user;
