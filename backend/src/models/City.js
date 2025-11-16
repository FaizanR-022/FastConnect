import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const City = sequelize.define(
  "City",
  {
    city_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "countries",
        key: "country_id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "cities",
  }
);

export default City;
