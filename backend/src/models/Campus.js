import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Campus = sequelize.define(
  "Campus",
  {
    campus_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campus_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "campuses",
  }
);

export default Campus;
