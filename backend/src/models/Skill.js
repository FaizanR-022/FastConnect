import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Skill = sequelize.define(
  "Skill",
  {
    skill_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    skill_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "skills",
  }
);

export default Skill;
