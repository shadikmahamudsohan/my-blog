import mongoose from "mongoose";
export const connectMongoDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    await mongoose.connect(`mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASS}@cluster0.fstbced.mongodb.net/?retryWrites=true&w=majority`);
    return console.log("mongodb is connected");
};
// shadikmahamudsohan
// vHHncPx8wiC3w2bk