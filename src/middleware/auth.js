const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyJwtAsync = promisify(jwt.verify);

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    const decoded = await verifyJwtAsync(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
    next(error);
  }
};

module.exports = {
  authenticateToken,
};
