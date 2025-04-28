import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("session-token");
    if (!token) return res.status(403).json({ message: "Invalid session" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {
      user: { id },
    } = decoded;

    const user = await User.findById(id);

    if (!user) return res.status(403).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
