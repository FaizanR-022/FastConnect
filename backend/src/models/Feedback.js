import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Feedback = sequelize.define(
  "Feedback",
  {
    feedback_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: {
          args: [1, 200],
          msg: "Subject must be between 1 and 200 characters",
        },
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [5, 5000],
          msg: "Message must be between 5 and 5000 characters",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "reviewed", "resolved"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    updatedAt: true,
    tableName: "feedbacks",
  }
);

export default Feedback;
