export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password"); // Exclude passwords
  res.json(users);
};
