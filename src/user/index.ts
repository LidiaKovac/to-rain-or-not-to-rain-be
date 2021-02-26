import { NextFunction, Request, Response } from "express"; //gotta make sure to import those from express and not use
import mongoose from "mongoose"

const userRTR = require("express").Router();
interface User {
    complete_name: String,
    email: String,
    password: String, 
    favorite_cities: Array<String>
}

userRTR.get("/", async(req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = userRTR