import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.verifyPassword = async function (plainPassword) {
  return await argon2.verify(this.password, plainPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
