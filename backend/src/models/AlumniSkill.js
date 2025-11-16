import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const AlumniSkill = sequelize.define(
  "AlumniSkill",
  {
    alumni_skill_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alumni_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "alumnis",
        key: "alumni_id",
      },
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "skills",
        key: "skill_id",
      },
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    tableName: "alumni_skills",
    indexes: [
      {
        unique: true,
        fields: ["alumni_id", "skill_id"], // Prevent duplicate skills per alumni
      },
    ],
  }
);

export default AlumniSkill;
