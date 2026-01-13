import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Country = sequelize.define(
  "Country",
  {
    country_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    country_code: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "countries",
  }
);

export default Country;
