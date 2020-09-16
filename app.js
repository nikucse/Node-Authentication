const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoute");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view Engine
app.set("view engine", "ejs");

// Connect to database
mongoose
  .connect("mongodb://localhost:27017/Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(5000, () => console.log("Connect to database")))
  .catch((err) => console.log(err));

// routes
app.use("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/learn", requireAuth, (req, res) => res.render("learn"));

app.use(authRoutes);
