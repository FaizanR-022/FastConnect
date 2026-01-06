import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Nullable for system notifications
      references: {
        model: "users",
        key: "user_id",
      },
    },
    type: {
      type: DataTypes.ENUM("new_post", "post_reply", "post_like"),
      allowNull: false,
    },
    target_type: {
      type: DataTypes.ENUM("post", "reply"),
      allowNull: false,
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment:
        "Stores additional data like postTitle, postUuid, actorName, preview",
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email_scheduled_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Timestamp when email should be sent (5-10 min delay)",
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    tableName: "notifications",
    indexes: [
      {
        name: "idx_notifications_recipient_created",
        fields: ["recipient_id", "createdAt"],
        order: [["createdAt", "DESC"]],
      },
      {
        name: "idx_notifications_unread",
        fields: ["recipient_id", "is_read"],
      },
      {
        name: "idx_notifications_email_pending",
        fields: ["email_sent", "email_scheduled_at"],
      },
      {
        name: "idx_notifications_created_at",
        fields: ["createdAt"],
      },
    ],
  }
);

export default Notification;
