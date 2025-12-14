import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// req.body is an object that containing data coming from client (POST request)
export const signUp = async (req, res, next) => {
  // Implement Signup logic here

  const session = await mongoose.startSession();
  session.startTransaction(); //it will do atomic operation means all or nothing

  try {
    // logic to create user
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash the password for new user
    const salt = await bcrypt.genSalt(10); // generating random password string
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  // Implement Signin logic here
};

export const signOut = async (req, res, next) => {
  // Implement Signout logic here
};
