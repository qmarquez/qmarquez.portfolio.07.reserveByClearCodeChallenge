import { Schema, model } from "mongoose";
import { Client } from "./client.model.js";

const memberSchema = new Schema({
  _client: { type: Schema.Types.ObjectId, ref: Client.modelName, required: true },
  memberName: { type: String, required: true },
  memberPhoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

export const Member = model('Member', memberSchema);