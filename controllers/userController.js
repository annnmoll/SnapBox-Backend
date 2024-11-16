import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const isExist = await User.findOne({ email });
    console.log(isExist);
    if (isExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Registered Successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 350 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    console.log("cookie generated");
    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error, message: "Something went wrong" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
