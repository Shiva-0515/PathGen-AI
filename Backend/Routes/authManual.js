const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");
const User = require("../models/User");

const router = express.Router();

// ---------------------------
// SIGNUP (Full name, email, password)
// ---------------------------
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      displayName: fullName,
      email,
      password: hashedPassword,
      photo: "",
    //   googleId: null
    });

    // Auto login after signup
    req.login(newUser, (err) => {
      if (err) return res.status(500).json({ error: "Login error" });
      return res.json({ message: "Signup successful", user: newUser.displayName });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------------------
// SIGNIN (email + password)
// ---------------------------
router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(400).json({ error: info.message || "Login failed" });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: "Login successful", user: user.displayName });
    });

  })(req, res, next);
});

// ---------------------------
// Logout (Shared with Google)
// ---------------------------
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
