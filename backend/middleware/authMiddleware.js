const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  // get token from headers
  const token = req.headers.authorization;

  // no token
  if (!token) {

    return res.status(401).json({
      message: "Access denied",
    });

  }

  try {

    // verify token
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // save user data
    req.user = verified;

    // continue
    next();

  } catch (error) {

    res.status(400).json({
      message: "Invalid token",
    });

  }

};

module.exports = verifyToken;