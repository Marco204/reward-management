import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Fady:tlyUTsU63bwomIYG@expressprojects.aifqkle.mongodb.net/marco?retryWrites=true&w=majority&appName=ExpressProjects")
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;