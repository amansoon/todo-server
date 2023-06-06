import {connect } from "mongoose";

async function connectDB(DB_URL: string) {
  try {
    const OPTIONS = {
      dbName: "tododb",
    };
    const conn = await connect(DB_URL, OPTIONS);
    if (conn) {
      console.log("Connected Successfully...");
    }
  } catch (err) {
    console.log(err);
  }
}

export { connectDB };
