import { Schema, model } from "mongoose";
import { Member } from "./member.model.js";

const memberNotesSchema = new Schema({
  _member: { type: Schema.Types.ObjectId, ref: Member.modelName, required: true, select: false },
  note: { type: String, required: true },
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export const MemberNotes = model('Notes', memberNotesSchema);