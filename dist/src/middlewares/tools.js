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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../services/user/schema");
const verifyJWT = (token) => new Promise((res, rej) => jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
        rej(err);
    else
        res(decoded);
}));
const generateJWT = (payload) => new Promise((res, rej) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1 day' }, //value is a string (expressing the time ) or a number (in seconds)
(err, token) => {
    if (err)
        rej(err); //reject
    res(token); //sets response
}));
const authentication = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccessToken = yield generateJWT({ _id: user._id });
        yield userModel.findById(user._id);
        return newAccessToken;
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
});
const findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.findOne({ email: email });
    if (user) {
        const isMatch = yield bcrypt.compare(password, user.password);
        if (isMatch)
            return user;
        else
            return null;
    }
});
module.exports = {
    verifyJWT,
    findByCredentials,
    authentication,
};
