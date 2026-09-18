import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/medishare";
        const connectionInstance = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 2500
        });
        console.log("Connected to MongoDB:", connectionInstance.connection.host);
        return connectionInstance;
    } catch (error) {
        console.warn("MongoDB connection warning:", error.message);
        mongoose.set('bufferCommands', false);
        throw error;
    }
};

export default connectDB;


 