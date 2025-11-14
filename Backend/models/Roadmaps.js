const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  course: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  roadmap: { type: Object, required: true },
  Public:{type:String , required: false} // store JSON response
}, { timestamps: true });

roadmapSchema.index({ course: 1, level: 1, duration: 1 }, { unique: true }); // Prevent duplicates

module.exports = mongoose.model("Roadmap", roadmapSchema);
