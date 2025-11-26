// config/passport.js
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      if (!user.password) {
        return done(null, false, { message: "This email is registered using Google. Use Google Login." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);

    } catch (err) {
      return done(err);
    }
  })
);

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Try to find the user by Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // Create a new user if not found
      user = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0].value,
        photo: profile.photos?.[0].value,
      });
      console.log("🆕 Created new user:", user);
    } else {
      console.log("✅ Existing user:", user);
    }

    return done(null, user);
  } catch (error) {
    console.error("❌ Error in GoogleStrategy:", error);
    return done(error, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


module.exports = passport;
