import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PostLike = sequelize.define(
  "PostLike",
  {
    like_id: {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    timestamps: true,
    updatedAt: false, // Only track when liked, not when updated
    tableName: "post_likes",
    indexes: [
      {
        unique: true,
        fields: ["post_id", "user_id"], // Prevent duplicate likes
      },
    ],
  }
);

export default PostLike;
