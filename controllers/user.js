import bcrypt from "bcryptjs";

import { User } from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const body = req.body;
    const requireFields = ["name", "email", "password"];

    for (const field of requireFields) {
      if (!body[field]) {
        return res.status(400).json({ message });
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

    if (validPassword) {
      res.status(200).json({ message: "Login Successfully" });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      message: "Internal Server Error",
    });
  }
};
