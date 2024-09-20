import mongoose from "mongoose";
import userSchema from "./schema.js";
import encrypt from "./pre/save/passwordHash.js";
import methods from './methods/index.js'

userSchema.pre('save', encrypt)
Object.assign(userSchema.methods, methods);

const User = mongoose.model('user', userSchema)


export default User