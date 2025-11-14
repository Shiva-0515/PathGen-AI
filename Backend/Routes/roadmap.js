const express = require("express");
const axios = require("axios");
const Roadmap = require("../models/Roadmaps.js");
const router = express.Router();

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

//check usage limit


function ensureAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized. Please log in first." });
  }
  next();
}

router.post("/generate-roadmap", ensureAuthenticated, async (req, res) => {
  const { course, level, duration } = req.body;
  try {
    const existing = await Roadmap.findOne({ course, level, duration });
    if (existing) {
      console.log("📦 Roadmap served from DB cache");
      return res.json(existing.roadmap);
    }

    const response = await axios.post(`${FASTAPI_URL}/generate-roadmap`, { course, level, duration });
    const roadmapData = response.data;

    await Roadmap.create({
      course,
      level,
      duration,
      roadmap: roadmapData,

      userId: req.user.id, // Make sure you're storing the user ID!
    });

    console.log("🆕 Roadmap generated and stored in DB");
    res.json(roadmapData);
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
    res.status(500).json({ error: "Failed to fetch roadmap" });
  }
});

router.post("/roadmaps/:id/share", ensureAuthenticated, async (req, res) => {
  try {
    const roadmapId = req.params.id;
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId: req.user.id });
    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found or not owned by you" });
    }
    roadmap.Public = "true";
    await roadmap.save();
    res.json({ message: "Roadmap is now public!" });
  } catch (error) {
    console.error("❌ Error sharing roadmap:", error);
    res.status(500).json({ error: "Failed to share roadmap" });
  }
});

router.post("/roadmaps/:id/unshare", ensureAuthenticated, async (req, res) => {
  try {
    const roadmapId = req.params.id;
    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId: req.user.id });
    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found or not owned by you" });
    }
    roadmap.Public = "false";
    await roadmap.save();
    res.json({ message: "Roadmap is no longer public." });
  } catch (error) {
    console.error("❌ Error unsharing roadmap:", error);
    res.status(500).json({ error: "Failed to unshare roadmap" });
  }
});


module.exports = router;
