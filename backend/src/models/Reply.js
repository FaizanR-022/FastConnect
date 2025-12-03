import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Reply = sequelize.define(
  "Reply",
  {
    reply_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "post_id",
      },
    },
    alumni_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "alumnis",
        key: "alumni_id",
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Reply must be between 1 and 5000 characters",
        },
      },
    },
  },
  {
    timestamps: true,
    paranoid: true, // Soft delete
    updatedAt: false, // Replies don't get updated, only created/deleted
    tableName: "replies",
  }
);

export default Reply;
