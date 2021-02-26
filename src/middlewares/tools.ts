
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

import { Request } from "express";
import { Mongoose } from "mongoose";
import {User} from "../interfaces"
const userModel = require("../services/user/schema")

const verifyJWT = (token:String) =>
  new Promise((res, rej) =>
  
    jwt.verify(token, process.env.JWT_SECRET, (err:Error, decoded:String) => {
      if (err) rej(err)
      else res(decoded);
    })
  )

const generateJWT = (payload:Object):Promise<String> =>
      new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1 day' }, //value is a string (expressing the time ) or a number (in seconds)
      (err:Error, token:String) => {
        if (err) rej(err); //reject
        res(token); //sets response
      }
    )
  );


const authentication = async (user:User):Promise<String> => {
  try {
    const newAccessToken = await generateJWT({_id: user._id});
    await userModel.findById(user._id)
    return newAccessToken;
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
};

const findByCredentials = async (email:String, password:String) => {
    const user = await userModel.findOne({email: email})
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    else return null
  }
};

module.exports = {
  verifyJWT,
  findByCredentials,
  authentication,
};
