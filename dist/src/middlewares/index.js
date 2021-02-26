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
const userModel = require("../services/user/schema");
const { verifyJWT } = require("./tools");
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const headers = req.headers;
        const token = yield ((_a = headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", ""));
        const decoded = yield verifyJWT(token);
        const user = yield userModel.findById({
            _id: decoded._id,
        });
        if (!user) {
            throw new Error("User not found");
        }
        req.body.token = token;
        req.body.user = token;
        next();
    }
    catch (e) {
        next(e);
    }
});
module.exports = authorize;
