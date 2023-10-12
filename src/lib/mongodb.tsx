import mongoose from "mongoose";

const connectMongoDB = async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string);
    if (!connect) {
        throw new Error("failed to connect to mongodb");
    }

    return connect;
};

export default connectMongoDB;
