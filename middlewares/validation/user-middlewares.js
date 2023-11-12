exports.signupValidator = async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    return res.status(400).json({
      success: false,
      message: "Email is invalid",
    });
  }

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  if (name.length < 2 || name.length > 20) {
    return res.status(400).json({
      success: false,
      message:
        "Name length should be greater than 2 or less than 20 characters",
    });
  }

  if (!password) {
    return res.json({
      success: false,
      error: `password is required`,
    });
  }

  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({
      success: false,
      message:
        "Password length should be greater than 8 or less than 20 characters",
    });
  }

  next();
};
