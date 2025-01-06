import mongoose from "mongoose";
import User from "../models/Users.js";

export const addUser = async (req, res, next) => {
    const { username, email } = req.body;

    try {
        const newUser = new User({ name: username, email });
        await newUser.save();
        res.status(201).json({ message: "User added successfully!", user: newUser });
    } catch (error) {
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
