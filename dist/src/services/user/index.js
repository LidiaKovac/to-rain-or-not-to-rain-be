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
const bcryptjs = require("bcryptjs");
const userModel = require("./schema");
const authorize = require("../../middlewares");
const userRTR = require("express").Router();
const { authentication } = require("../../middlewares/tools"); //important to export between {}
userRTR.get("/", authorize, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.find();
        if (users.length > 0)
            res.send(users);
        else
            throw Error("No users found");
    }
    catch (error) {
        next(error);
    }
}));
userRTR.get("/search", authorize, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchResults = yield userModel.find(req.query);
        if (searchResults.length > 0)
            res.send(searchResults);
        else
            throw Error("No users found");
    }
    catch (error) {
        next(error);
    }
}));
userRTR.put("/addfav/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });
        res.send(200);
    }
    catch (error) {
        next(error);
    }
}));
userRTR.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPW = yield bcryptjs.hash(req.body.password, 10);
        const user = {
            complete_name: req.body.complete_name,
            email: req.body.email,
            password: hashedPW
        };
        const newUser = yield new userModel(user);
        const { _id } = yield newUser.save();
        res.status(201).send(_id);
    }
    catch (error) {
        next(error);
    }
}));
userRTR.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.email && req.body.password) { //check is email and password are provided
            let user = yield userModel.findOne({ email: req.body.email });
            if (user) {
                const isValid = yield bcryptjs.compare(req.body.password, user.password);
                if (isValid) {
                    const token = yield authentication(user);
                    res.send(token);
                }
                else
                    throw new Error("401 - Wrong email or password!");
            }
            else
                throw new Error("User not found!");
        }
    }
    catch (error) {
        next(error);
    }
}));
module.exports = userRTR;
