import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      dbName: "fyp-saviour",
    });
    console.log("MongoDb connection :", conn.connection.host);
  } catch (error) {
    console.log("error in connectDb->", error);
    process.exit(1);
  }
};
