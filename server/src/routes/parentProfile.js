import express from "express";
import ParentProfile from "../models/ParentProfile.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Parent Profile
router.post("/", authMiddleware, async (req, res) => {
  try {
    const profile = new ParentProfile({
      ...req.body,
      userId: req.user._id, // ✅ attach from verified JWT user
    });

    await profile.save();
    res.status(201).json({ 
      message: "Parent profile saved successfully", 
      data: profile 
    });
  } catch (err) {
    console.error("Error saving parent profile:", err);
    res.status(500).json({ 
      message: "Failed to save profile", 
      error: err.message 
    });
  }
});

// ✅ Fetch Parent Profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await ParentProfile.findOne({ userId: req.user.id });
    if (!profile)
      return res.status(404).json({ message: "Parent profile not found" });

    res.json(profile);
  } catch (err) {
    console.error("Error fetching parent profile:", err);
    res.status(500).json({ message: "Failed to fetch parent profile", error: err.message });
  }
});


export default router;
