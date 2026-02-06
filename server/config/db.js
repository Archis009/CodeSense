import mongoose from 'mongoose';

const connectDB = async () => {
  // Check if we have a connection to the database or if it's currently connecting or disconnecting
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // In serverless, do not exit process, just throw error so the request fails gracefully
    throw new Error(`Database Connection Failed: ${error.message}`);
  }
};

export default connectDB;
