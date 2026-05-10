import mongoose from "mongoose";

const parentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  child: {
    name: { type: String, required: true },
    schoolName: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String },
  },
  parentContact: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  schoolAddress: {
    address1: String,
    address2: String,
    landmark: String,
    locality: String,
  },
  pickupAddress: {
    address1: String,
    address2: String,
    landmark: String,
    locality: String,
  },
  plan: {
    type: String,
    enum: ["monthly", "6months", "12months"],
    required: true,
  },
  payment: {
    method: String,
    cardName: String,
    last4Digits: String,
    expiryDate: String,
  },
}, { timestamps: true });

export default mongoose.model("ParentProfile", parentProfileSchema);
