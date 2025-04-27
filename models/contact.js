import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId },
});

export const Contact = mongoose.model("contact", contactSchema);
