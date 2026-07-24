import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log(` MongoDB ${mongoose.connection.db?.databaseName} is already connected.`);
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`App is Successfully connected to MongoDB : ${mongoose.connection.db?.databaseName}!`);
  } catch (error) {
    console.error("Pantry App has Failed to connect to MongoDB:", error);
    throw error;
  }
}