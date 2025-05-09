import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const body = req.body;
    const requireFields = ["name", "email", "password"];

    for (const field of requireFields) {
      if (!body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const { name, email, password } = body;
    const duplicateEmail = await User.findOne({ email });

    if (duplicateEmail)
      return res.status(400).json({ message: "Email Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User Created Successfully", user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const body = req.body;
    const requireFields = ["email", "password"];

    for (const field of requireFields) {
      if (!body[field]) {
        return res.status(400).json({ message });
      }
    }

    const { email, password } = body;
    const userDetails = await User.findOne({ email });

    if (!userDetails)
      return res
        .status(400)
        .json({ message: "Email Not Associated with any account" });

    const validPassword = await bcrypt.compare(password, userDetails.password);

    if (!validPassword)
      return res.status(400).json({ message: "Invalid Password" });

    const { _id, name, email: userEmail } = userDetails;

    const token = jwt.sign(
      { user: { id: _id, name, email: userEmail } },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res
      .status(200)
      .json({ message: "Login Successfully", token, user_id: _id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
