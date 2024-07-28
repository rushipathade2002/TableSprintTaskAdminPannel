const mongoose = require("mongoose");
const mongodb = require("mongodb");

const URL = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connection successful to DB");
    } catch (error) {
        console.error("Database connection failed ");
        process.exit(0);
    }
}


module.exports=connectDB;
