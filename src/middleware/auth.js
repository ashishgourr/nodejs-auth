import { verify, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { promisify } from "util";

const verifyJwtAsync = promisify(verify);

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
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
    next(error);
  }
};

export default {
  authenticateToken,
};
