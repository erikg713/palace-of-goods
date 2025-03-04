import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Role field
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

export const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
});
resetPasswordToken: { type: String },
resetPasswordExpires: { type: Date },
