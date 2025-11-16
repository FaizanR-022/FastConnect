import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Company = sequelize.define(
  "Company",
  {
    company_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "companies",
  }
);

export default Company;
