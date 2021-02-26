const mongoose = require("mongoose")
const express = require("express");
const cors = require("cors");
const endpoints = require("express-list-endpoints");
const server = express();
const services = require("./services");

const port = process.env.PORT;

const userRouter = require("./services/user")
const weatherRouter = require("./services/weather")

server.use(express.json());
server.use(cors());
server.use(userRouter, "/user")
server.use(weatherRouter, "/weather")

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(
    server.listen(port, () => {
      console.log("✅  Server is running on port " + port + "with endpoints: " + endpoints(server));
    })
  )
  .catch((err:Error) => console.log("❌ Error : " + err));