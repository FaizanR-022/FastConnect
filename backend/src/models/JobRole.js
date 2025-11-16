import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const JobRole = sequelize.define(
  "JobRole",
  {
    job_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    job_title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "job_roles",
  }
);

export default JobRole;
