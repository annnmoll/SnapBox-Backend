import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    .connect(`mongodb://localhost:27017/snapbox`)
    .then((res) => console.log(`MongoDB Connected: {conn.connection.host}`))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDB;
