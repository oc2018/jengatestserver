import usersModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import env from "dotenv";
import mongoose from "mongoose";
import { deleteById } from "../utils/controller.helper.fxns.js";

env.config();

const secret = process.env.JWT_SECRET;

export const getUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await usersModel.findOne({ _id });
    const { password, ...withoutPass } = user.toObject();
    res.status(200).json(withoutPass);
  } catch (error) {
    console.error({ error: error.message || error });
    res.status(400).json({ error: `User query failed` });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.error({ error: error.message || error });
    res.status(400).json({ error: `Users query failed` });
  }
};

export const createUser = async (req, res) => {
  const { name, password, email, confirmPassword } = req.body;

  try {
    const isExistingUser = await usersModel.findOne({ email });

    if (isExistingUser)
      return res.status(400).json({ error: "User already registered" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Password and confirm Password should match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await usersModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      secret,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ user: { email: newUser.email, name: newUser.name }, token });
  } catch (error) {
    console.error({ error: error.message || error });
    res.status(500).json({ error: `User signup failed` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExistingUser = await usersModel.findOne({ email });

    if (!isExistingUser)
      return res.status(403).json({ error: "Not a registered user, Sign up" });
    const isAuthorizedUser = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isAuthorizedUser)
      return res.status(403).json({ error: "Invalid Credentials" });

    const token = jwt.sign(
      {
        userId: isExistingUser._id,
        name: isExistingUser.name,
        email: isExistingUser.email,
      },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: {
        email: isExistingUser.email,
        name: isExistingUser.name,
        id: isExistingUser._id,
      },
      token,
    });
  } catch (error) {
    console.error({ error: error.message || error });
    res.status(500).json({ error: `Login failed` });
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;

  try {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(_id);
    const isExistingUser = await usersModel.findOne({ _id });
    if (!isExistingUser || !isValidMongoId)
      return res.status(404).json({ error: `User not found` });

    const updatedUser = await usersModel.findOneAndUpdate(
      { _id },
      { ...data, password: data.password },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error({ error: error.message || error });
    res.status(500).json({ error: `User details update failed` });
  }
};

export const deleteUser = deleteById(usersModel);
