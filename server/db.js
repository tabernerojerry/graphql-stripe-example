import mongoose from "mongoose";

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default (async () => {
  try {
    await mongoose.connect(
      MONGO_URL,
      { useNewUrlParser: true }
    );
    console.log("MongodDB Connected!");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
})();
