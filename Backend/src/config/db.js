import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected succesifully!");
  } catch (error) {
    console.log("An error occured", +error);
  }
};
