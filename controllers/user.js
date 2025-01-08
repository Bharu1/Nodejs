import mongoose from "mongoose";
import User from "../models/Users.js";

export const addUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required: username, email, and password." });
  }

  try {
    const newUser = new User({ name: username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!", user: { username, email } });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already registered." });
    }
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.json({ message: "Login successful!", user: { name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
};
