const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json("Access Denied!");

  try {
    const verified = jwt.verify(token, "your_jwt_secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid Token!");
  }
};

module.exports = verifyToken;
