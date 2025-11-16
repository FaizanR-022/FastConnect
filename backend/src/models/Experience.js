import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Experience = sequelize.define(
  "Experience",
  {
    experience_id: {
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
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "companies",
        key: "company_id",
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "job_roles",
        key: "job_id",
      },
    },
    is_current: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    start_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1990, // Reasonable work history start
        max: new Date().getFullYear(),
      },
    },
    end_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1990,
        max: new Date().getFullYear(),
        isValidEndYear(value) {
          if (value !== null && value < this.start_year) {
            throw new Error(
              "end_year must be greater than or equal to start_year"
            );
          }
        },
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "cities",
        key: "city_id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    updatedAt: false,
    tableName: "experiences",
    validate: {
      checkCurrentPosition() {
        if (this.is_current === true && this.end_year !== null) {
          throw new Error("Current position cannot have an end_year");
        }
      },
    },
  }
);

export default Experience;
