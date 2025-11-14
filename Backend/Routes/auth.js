const express = require("express");
const passport = require("../config/passport"); // use your configured passport
const session = require("express-session");
const router = express.Router();


router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000/", // or anywhere
    // failureRedirect: "http://localhost:5000/auth/google",
    // successRedirect: "/protected",
  })
);


router.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.displayName}! You are authenticated.`);
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("❌ Error during logout:", err);
      return res.status(500).json({ error: "Logout failed" });
    }

   req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        path: "/", // Make sure path matches your session config
        // domain: "yourdomain.com", // Uncomment if you set a custom domain in your session
      });
      // Or, if you prefer a redirect:
       res.json({ message: "Logged out successfully" });
      // res.redirect("/");
    });
  });
});
router.get("/auth/status", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    console.log(req.user);
    res.json({ loggedIn: true, user: req.user.displayName});
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
