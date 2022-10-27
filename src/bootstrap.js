import mongoose from "mongoose";

export async function bootstrap() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  console.log('Database succesfully connected.');
}