import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!")
    } catch (error) {
        console.log("Error connecting to mongodb!", error.message)
    }
}

export default connectToMongoDB;