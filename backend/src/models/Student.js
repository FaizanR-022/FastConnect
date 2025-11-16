import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Student = sequelize.define(
  "Student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "departments",
        key: "department_id",
      },
    },
    campus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "campuses",
        key: "campus_id",
      },
    },
    batch_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [new Date().getFullYear() - 6],
          msg: "Batch year cannot be more than 6 years in the past",
        },
        max: {
          args: [new Date().getFullYear()],
          msg: "Batch year cannot be in the future",
        },
      },
    },
    pfp_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "students",
  }
);

export default Student;
