const authService = require("../services/authService");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const token = await authService.register(email, password);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
      });
    } catch (error) {
      if (error.message === "User already exists") {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const token = await authService.login(email, password);
      res.json({
        success: true,
        token,
      });
    } catch (error) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  async googleCallback(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Google authentication failed",
        });
      }

      const token = await authService.generateToken(req.user);

      // In production, you might want to redirect to a frontend URL with the token
      res.json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
