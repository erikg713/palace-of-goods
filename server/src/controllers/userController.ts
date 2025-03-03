import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string);
    res.json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Update profile picture
export const updateProfilePicture = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const user = await User.findByPk(req.user?.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.profilePic = (req.file as any).path;
    await user.save();

    res.json({ message: "Profile picture updated", profilePic: user.profilePic });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};
