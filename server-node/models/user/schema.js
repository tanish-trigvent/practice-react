import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: 'string'
    },
    lastName: {
        type: 'string'
    },
    email: {
        type: 'string'
    },
    password: {
        type: 'string'
    }
}, {
    timestamps: true
})

export default userSchema