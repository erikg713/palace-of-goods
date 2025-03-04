import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  const verificationToken = crypto.randomBytes(32).toString("hex"); // Generate token

  const user = await User.create({ name, email, password: hashedPassword, role, isVerified: false, verificationToken });

  const verificationUrl = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;
  await sendEmail(user.email, "Verify your email", `<a href="${verificationUrl}">Click here to verify</a>`);

  res.status(201).json({ message: "Please check your email to verify your account." });
};
// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ _id: user.id, email: user.email, role: user.role });
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role }, // Include role in JWT
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
};
/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, data: user });
  } catch (error: any) {
    console.error("❌ Error fetching user profile:", error.message);
    res.status(500).json({ success: false, error: "Error fetching profile" });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { username, email, password } = req.body;

    let updateData: any = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 12);

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    res.json({ success: true, message: "Profile updated", data: updatedUser });
  } catch (error: any) {
    console.error("❌ Error updating profile:", error.message);
    res.status(500).json({ success: false, error: "Error updating profile" });
  }
};

/**
 * @desc    Delete user account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting user:", error.message);
    res.status(500).json({ success: false, error: "Error deleting user" });
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
  await user.save();

  const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;
  await sendEmail(user.email, "Reset your password", `<a href="${resetUrl}">Reset Password</a>`);

  res.json({ message: "Password reset email sent." });
};
