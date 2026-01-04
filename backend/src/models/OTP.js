import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const OTP = sequelize.define(
  "OTP",
  {
    otp_id: {
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
    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    tableName: "otps",
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["expires_at"],
      },
    ],
  }
);

export default OTP;
