const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.json({
      success: false,
      error: "not authorized to access this route",
    });
  }

  try {
    const user = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
  } catch (err) {
    return res.json({
      success: false,
      error: "not authorized to access this route",
    });
  }

  next();
};
