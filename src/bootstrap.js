import mongoose from "mongoose";


export async function bootstrap() {
  const { env } = process;
  mongoose.connect(env.MONGODB_URI);
}