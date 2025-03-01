export const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, primaryKey: true },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
});
