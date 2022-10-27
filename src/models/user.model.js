import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export const userRoles = {
  salesAdmin: 'salesAdmin'
};

const userSchema = new Schema({
  username: { type: String, unique: true },
  role: { type: String, enum: Object.values(userRoles) },
  password: { type: String, select: false },
})
  .plugin(mongooseUniqueValidator);

export const User = model('User', userSchema);

