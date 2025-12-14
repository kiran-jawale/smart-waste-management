import mongoose from 'mongoose';
import { MONGODB_URI, DB_NAME } from '../constants.js';

const connectdb = async function () {
  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log(`Successfully connected! Host: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectdb;