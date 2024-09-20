import mongoose from "mongoose";

function dbConnect() {
    mongoose.connect(process.env.DB_URL, {
        dbName: process.env.DB_NAME
    }).then(() => console.log('database connected')).catch((err) => console.log(err))

}

export default dbConnect

