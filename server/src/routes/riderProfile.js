import express from "express";
import RiderProfile from "../models/RiderProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Rider Profile
router.post("/", authMiddleware, async (req, res) => {
     console.log("User ID:", req.user._id);
  console.log("Incoming body:", req.body);
  try {
    const profile = new RiderProfile({
      ...req.body,
      userId: req.user._id, // ✅ use _id from verified token
    });
    await profile.save();
    res.status(201).json({ 
      message: "Rider profile saved successfully", 
      data: profile 
    });
  } catch (err) {
    console.error("Error saving rider profile:", err);
    res.status(500).json({ 
      message: "Failed to save rider profile", 
      error: err.message 
    });
  }
});

// ✅ Fetch Rider Profile (for dashboard)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await RiderProfile.findOne({ userId: req.user._id });

    if (!profile)
      return res.status(404).json({ message: "Rider profile not found" });

    res.json(profile);
  } catch (err) {
    console.error("Error fetching rider profile:", err);
    res.status(500).json({ 
      message: "Failed to fetch rider profile", 
      error: err.message 
    });
  }
});

export default router;
