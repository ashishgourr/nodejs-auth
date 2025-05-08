import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { findOne, create } from "../models/User";

class AuthService {
  async register(email, password) {
    const existingUser = await findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);
    const user = await create({
      email,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async login(email, password) {
    const user = await findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return this.generateToken(user);
  }

  generateToken(user) {
    return sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );
  }
}

export default new AuthService();
