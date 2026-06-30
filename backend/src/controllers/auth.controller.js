import userModel from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
  const { username, cnic, password } = req.body;

  if (!username || !cnic || !password) {
    throw new Error("username , cnic and passsword are required");
  }
  if (cnic.length !== 13) {
    throw new Error("CNIC should be 13 characters long");
  }

  const isUserExists = await userModel.findOne({ cnic: cnic });
  if (isUserExists) {
    throw new Error("User already exists (username and cnic) should be unique");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    cnic,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(201).json({
    message: "User registered successfully",
    data: user,
    token,
  });
}

async function loginUser(req, res) {
  const { cnic, password } = req.body;

  if (!cnic || !password) {
    throw new Error(" CNIC and Password are required");
  }
  console.log("--------------------------");

  

  const user = await userModel.findOne({ cnic: cnic });
  if (!user) {
    throw new Error("password or cnic are incorrect");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Password is incorrect");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.status(200).json({
    message: "User Logged in successfully",
    token,
    data: user,
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User Logged out successfully",
  });
}

export default {
  registerUser,
  loginUser,
  logoutUser,
};
