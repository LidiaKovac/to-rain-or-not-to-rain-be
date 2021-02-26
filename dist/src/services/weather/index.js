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
const weatherRTR = require("express").Router();
const authorize = require("../../middlewares");
const axios = require("axios");
weatherRTR.get("/:city", authorize, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&appid=${process.env.OW_API_SECRET}`);
        let city = {
            name: response.data[0].name,
            lat: response.data[0].lat,
            lon: response.data[0].lon,
            country: response.data[0].country,
        };
        const response_weather = yield axios.get(`https://api.openweathermap.org/data/2.5/onecall?exclude=alerts&units=metric&lat=${city ? city.lat : "45.4643"}&lon=${city ? city.lon : "9.1895"}&appid=${process.env.OW_API_SECRET}`);
        res.send(response_weather.data);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = weatherRTR;
