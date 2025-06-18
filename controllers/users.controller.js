import usersModel from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = "theatNew#%365string";

export const getUser = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await usersModel.findOne({ _id });
    const { password, ...withoutPass } = user.toObject();
    res.status(200).json(withoutPass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
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
    res.status(400).json({ error: error.message });
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
    res.status(400).json(error.message);
  }
};
