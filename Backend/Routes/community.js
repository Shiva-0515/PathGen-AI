const express = require("express");
const Roadmap = require("../models/Roadmaps"); // Adjust the path as necessary
const router = express.Router();

router.get("/community", (req, res, next) => {
    if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized. Please log in first." });
  }
  next();
}
, async (req, res) => {
  try {
    const publicRoadmaps = await Roadmap.find({ Public: "true" }).sort({ createdAt: -1 });
    res.json(publicRoadmaps);
  } catch (error) {
    console.error("❌ Error fetching public roadmaps:", error);
    res.status(500).json({ error: "Failed to fetch community roadmaps" });
  }
});
module.exports = router;