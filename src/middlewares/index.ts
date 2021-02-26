import { NextFunction, Request, Response } from "express";
const userModel = require("../services/user/schema")
const { verifyJWT } = require("./tools");
import { IncomingHttpHeaders } from 'http';

const authorize = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
  try {
    const headers:IncomingHttpHeaders = req.headers
    const token = await headers.authorization?.replace("Bearer ", "")
    const decoded = await verifyJWT(token);
    const user = await userModel.findById({
        _id: decoded._id,
      },
    );

    if (!user) {
      throw new Error("User not found")
    }
    req.body.token = token
    req.body.user = token
    next();
  } catch (e) {
    next(e)
  }
};

module.exports = authorize
