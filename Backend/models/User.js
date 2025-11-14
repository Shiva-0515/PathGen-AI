// // models/User.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   googleId: { type: String, required: true, unique: true },
//   displayName: String,
//   email: String,
//   photo: String,
//   dailyUsage: {
//   count: { type: Number, default: 0 },
//   lastUsed: { type: String, default: "" } // store as 'YYYY-MM-DD'
// },
// isPremium: { type: Boolean, default: false }
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true }, // ⬅ remove required
  password: { type: String }, // ⬅ for email/password auth

  displayName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  photo: { type: String },

  dailyUsage: {
    count: { type: Number, default: 0 },
    lastUsed: { type: String, default: "" }
  },

  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
