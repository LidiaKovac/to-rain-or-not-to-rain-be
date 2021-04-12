import { NextFunction, Request, Response } from "express"
import { City_Data } from "../../interfaces"

const weatherRTR = require("express").Router()
const authorize = require("../../middlewares")
const axios = require("axios")

weatherRTR.get(
	"/:city",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&appid=${process.env.OW_API_SECRET}`
			)
			let city:City_Data = {
				name: response.data[0].name,
				lat: response.data[0].lat,
				lon: response.data[0].lon,
				country: response.data[0].country,
			}
            
			const response_weather = await axios.get(
				`https://api.openweathermap.org/data/2.5/onecall?exclude=alerts&units=metric&lat=${
					city ? city.lat : "45.4643"
				}&lon=${city ? city.lon : "9.1895"}&appid=${process.env.OW_API_SECRET}`
			)
            res.send(response_weather.data)
		} catch (error) {
			next(error)
		}
	}
)

module.exports = weatherRTR
