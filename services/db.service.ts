import mongoose, { Mongoose } from "mongoose";

export async function dbConnect() {
   const client = await mongoose.connect(process?.env?.MONGODB_CONNECTION_STRING ?? "");
   return client;
}

dbConnect()