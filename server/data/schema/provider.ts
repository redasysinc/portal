import mongoose from "mongoose";

export interface IProvider {
    _id: String,
    email: String,
    roles: String,
    apiKey: String,
    profile: String,
    userName: String,
    createdAt: String,
    updatedAt: String
}

const ProviderSchema = new mongoose.Schema({
    email: {type:String, required:false},
    roles: {type:Array, required:false},
    apiKey: {type:String, required:false},
    profile: {type:Object, required:true},
    userName: {type:String, required:false},
    createdAt: {type:String, required:false},
    updatedAt: {type:String, required:false}
})

const Provider = mongoose.model<IProvider>("Provider", ProviderSchema)
export default Provider
