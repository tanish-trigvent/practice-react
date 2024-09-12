import mongoose from "mongoose";
import userSchema from "./schema.js";
import bcrypt from 'bcrypt'

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model('user', userSchema)


export default User