import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

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
