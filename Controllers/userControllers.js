const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  const user = await User.find();
  if (!user) {
    return res.json({ success: false, message: "no user found" });
  }
  return res.json({ success: true, data: user });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });

  if (!user) return res.json({ success: false, message: " user not found" });

  res.status(200).json({
    success: true,
    user: user,
    message: "user found successfully",
  });
};

exports.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = await jwt.sign(
      JSON.parse(JSON.stringify(user)),
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    res
      .cookie("token", token)
      .status(201)
      .json({
        succes: true,
        data: { ...user._doc, password: undefined },
        message: "sign up succesfully",
      });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: `${Object.keys(err.keyValue)[0]} is duplicate with value ${
          Object.values(err.keyValue)[0]
        }`,
      });
    }
    return res.json({
      success: false,
      error: "oops something went wrong",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });

    res.json({
      success: true,
      message: "user deleted succesfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { name, email, password, updateat: Date.now() }
    );

    res.json({
      success: true,
      updatedUser: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  //step 1 - req.body ( email ,pass)
  //step-2 - check email / not found
  //step -3 -

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      success: false,
      error: "not found user with this email & password",
    });

  if (await bcrypt.compare(password, user.password)) {
    const token = await jwt.sign(
      JSON.parse(JSON.stringify(user)),
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );
    return res.cookie("token", token).json({
      message: "Login successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      error: "not found user with this email & password",
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully" });
};
