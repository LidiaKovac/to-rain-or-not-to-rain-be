import { ObjectId } from "mongoose";

export interface User {
    _id: ObjectId,
    complete_name: String,
    email: String,
    password: String, 
    favorite_cities: Array<String>
}

export interface City_Data {
    
        name: String,
        lat: Number,
        lon: Number,
        country: String
    
}

