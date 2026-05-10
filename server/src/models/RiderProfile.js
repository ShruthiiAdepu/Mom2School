import mongoose from "mongoose";

const riderProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personal: {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    languages: { type: [String], default: [] },
  },
  vehicle: {
    type: { type: String, required: true },
    model: { type: String, required: true },
    regNumber: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    licenseValid: { type: Date, required: true },
  },
  experience: [{ company: String, duration: String }],
  expertise: [String],
  documents: {
    aadhar: String,
    pan: String,
    licenseCopy: String,
    vehicleRC: String,
  },
  skills: [String],
  otherSkills: String,
}, { timestamps: true });

export default mongoose.model("RiderProfile", riderProfileSchema);
