const express = require("express");
const User = require("../models/userModel");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
} = require("../Controllers/userControllers");
const { isAuthenticated } = require("../middlewares/auth-middleware");
const {
  signupValidator,
} = require("../middlewares/validation/user-middlewares");

const router = express.Router();

router.get("/users", isAuthenticated, getUsers);

router.get("/users/logout", logout);

router.get("/users/:id", getUserById);

router.post("/users/signup", signupValidator, createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/users/login", login);

module.exports = router;
