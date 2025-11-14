require("dotenv").config(); // Load environment variables first

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/db"); 
const passport = require("./config/passport");
require("./models/User");
const authRoutes = require("./Routes/auth")
const roadmapRoutes = require("./Routes/roadmap");
const communityRoutes = require("./Routes/community");
const MongoStore = require("connect-mongo"); // Ensure you have this package installed
const { listIndexes } = require("./models/User");
const quizRoutes = require("./Routes/quiz");
const authManualRoutes = require("./Routes/authManual");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, // should match your db.js
    collectionName: "sessions",
  }),
  cookie: {
    path: "/",          // important for clearCookie to match
    httpOnly: true,
    secure: false,
    sameSite:"lax",      // must be false if testing over HTTP
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}));

//passport authentication
app.use(passport.initialize());
app.use(passport.session());


// Register routes
app.use("/", authRoutes);
app.use("/", roadmapRoutes);
app.use("/", communityRoutes);
app.use("/", quizRoutes);
app.use("/auth", authManualRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
