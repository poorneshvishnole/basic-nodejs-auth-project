const express = require("express");
const app = express();
const dotenv = require("dotenv");
const User = require("./models/userModel");
const router = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();

require("./config/database");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running " + PORT);
});
