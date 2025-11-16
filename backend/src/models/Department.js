import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Department = sequelize.define(
  "Department",
  {
    department_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    department_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    department_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "departments",
  }
);

export default Department;
