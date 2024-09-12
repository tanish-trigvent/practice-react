import mongoose from "mongoose";

function dbConnect() {
    mongoose.connect('mongodb://localhost:27017', {
        dbName: 'To-do'
    }).then(() => console.log('database connected')).catch((err) => console.log(err))

}

export default dbConnect

