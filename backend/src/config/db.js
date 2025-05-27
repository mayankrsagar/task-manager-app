import mongoose from 'mongoose';

const connectDB=()=>{
  try {
    console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
  
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

export default connectDB;