import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  companyName: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  headcount: { type: String, required: true },
  isPublic: { type: Boolean, default: false }
});

export const Client = model('Client', clientSchema);