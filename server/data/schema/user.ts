import mongoose from "mongoose";
import {IUser} from "../../../src/types/user.ts";

const UserSchema = new mongoose.Schema({
    userName: {type: String, required:true},
    firstName: {type: String, required:true},
    middle: {type: String, required:false},
    lastName: {type: String, required:true},
    address: {type: String, required:false},
    phone:{type: String, required:false},
    gender: {type: String, required:false},
    dob: {type: Date, required:false}
})

const User = mongoose.model<IUser>("User", UserSchema)
export default User
