import mongoose, {Schema} from "mongoose" //gotta import the types from mongoose directly

const UserSchema = new Schema(
    {
        complete_name: {
            type: String,
            //required: "This is a mandatory field!" -> not required because I plan to use oAuth, I will make this mandatory in the sign up endpoint
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        favorite_cities: {
            type: Array,
            default: []
        }
    }
)
const userModel = mongoose.model("user", UserSchema)
module.exports = userModel