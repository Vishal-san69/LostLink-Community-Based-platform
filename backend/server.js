const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();
const communityRoutes = require("./routes/communityRoutes");

const adminRoutes =
require("./routes/adminRoutes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/communities",communityRoutes);
app.use("/api/admin",adminRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Lost & Found API Running");
});


// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});