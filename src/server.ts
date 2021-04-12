import { Router } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const mongoose = require("mongoose")
const express = require("express");
const cors = require("cors");
const endpoints = require("express-list-endpoints");
const server = express();

const port = process.env.PORT;

const userRouter:Router = require("./services/user")
const weatherRouter:Router = require("./services/weather")

server.use(express.json());
server.use(cors());
server.use("/user", userRouter )
server.use("/weather", weatherRouter)

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(
    server.listen(port, () => {
      console.log("✅  Server is running on port " + port );
    })
  )
  .catch((err:Error) => console.log("❌ Error : " + err));