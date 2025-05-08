const User = require("../models/User");

const initializeDatabase = async () => {
  try {
    // Create indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ googleId: 1 }, { sparse: true });

    console.log("Database indexes created successfully");
  } catch (error) {
    console.error("Error creating database indexes:", error);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
