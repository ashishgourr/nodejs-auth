const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API and database health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API and database are healthy
 *       500:
 *         description: Service is unhealthy
 */
router.get("/", async (req, res) => {
  try {
    // Check MongoDB connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    }[dbState];

    res.json({
      success: true,
      status: "healthy",
      timestamp: new Date(),
      database: {
        status: dbStatus,
        state: dbState,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: "unhealthy",
      error: error.message,
    });
  }
});

module.exports = router;
