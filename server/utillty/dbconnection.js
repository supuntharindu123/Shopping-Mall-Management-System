import mongoose from "mongoose";
import dotenv from "dotenv";

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Connected to MongoDB");
      return true;
    });
  } catch (e) {
    console.error(e);
    return false;
  }
}

export default connect;
