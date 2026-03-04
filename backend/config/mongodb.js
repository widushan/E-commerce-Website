import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
        isConnected = conn.connections[0].readyState === 1;
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectDB;
