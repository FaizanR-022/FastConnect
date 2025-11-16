import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Alumni = sequelize.define(
  "Alumni",
  {
    alumni_id: {
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
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
    graduation_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [2000],
          msg: "Graduation year must be 2000 or later",
        },
        max: {
          args: [new Date().getFullYear()],
          msg: "Graduation year cannot be in the future",
        },
      },
    },
    current_job_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "job_roles",
        key: "job_id",
      },
    },
    current_company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "companies",
        key: "company_id",
      },
    },
    current_city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "cities",
        key: "city_id",
      },
    },
    pfp_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "alumnis",
  }
);

export default Alumni;
