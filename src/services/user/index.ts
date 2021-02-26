import { NextFunction, Request, Response, urlencoded } from "express"; //gotta make sure to import those from express and not use
import mongoose from "mongoose"
import { User } from "../../interfaces";
const bcryptjs  = require("bcryptjs")
const userModel = require("./schema")
const authorize = require("../../middlewares")
const userRTR = require("express").Router();
const {authentication }= require("../../middlewares/tools") //important to export between {}

userRTR.get("/", authorize,  async(req:Request,res:Response,next:NextFunction):Promise<void> => { //type is Promise<void> and not just void because it's an async function
    try {
        const users = await userModel.find()
        if (users.length > 0) res.send(users)
        else throw Error("No users found")
    } catch (error) {
        next(error)
    }
})

userRTR.get("/search", authorize, async(req:Request, res:Response, next:NextFunction):Promise<void> => { //url example: user/search?complete_name=lidia
    try {
        const searchResults = await userModel.find(req.query)
        if (searchResults.length > 0) 
         res.send(searchResults)
        else throw Error("No users found")
    } catch (error) {
        next(error)
    }
})

userRTR.put("/addfav/:id", async(req:Request, res:Response, next:NextFunction):Promise<void>=> {
    try {
        const newUser = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { runValidators: true, new: true }
          );
        res.send(200)
    } catch (error) {
        next(error)
    }
})

userRTR.post("/register", async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    try {
        const hashedPW = await bcryptjs.hash(req.body.password, 10)
        const user = {
            complete_name: req.body.complete_name,
            email: req.body.email,
            password: hashedPW
        }
        const newUser = await new userModel(user)
        const { _id } = await newUser.save();
        res.status(201).send(_id)

    } catch (error) {
        next(error)
    }
})


userRTR.post("/login", async(req:Request, res:Response, next:NextFunction ):Promise<void> => {
    try {
        if (req.body.email && req.body.password) { //check is email and password are provided
			let user:User = await userModel.findOne({email: req.body.email})
            if (user) {
                const isValid:boolean = await bcryptjs.compare(req.body.password, user.password)
                if (isValid) {
                    const token = await authentication(user)
                    res.send(token)
                } else throw new Error("401 - Wrong email or password!")
            } else throw new Error("User not found!")
			
		}
    } catch (error) {
        next(error)
    }
})

module.exports = userRTR