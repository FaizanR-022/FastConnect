import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import { syncDatabase } from "./models/index.js";

// It brings env variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FastConnect Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await syncDatabase();
    console.log("Synced successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
