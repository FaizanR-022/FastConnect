import { Department, Campus, sequelize } from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();

const seedStaticData = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");

    const departments = await Department.bulkCreate(
      [
        { department_code: "cs", department_name: "Computer Science" },
        { department_code: "se", department_name: "Software Engineering" },
        { department_code: "ai", department_name: "Artificial Intelligence" },
        { department_code: "ds", department_name: "Data Science" },
        { department_code: "cys", department_name: "Cyber Security" },
        { department_code: "ft", department_name: "Financial Technology" },
        { department_code: "ba", department_name: "Business Administration" },
        { department_code: "bsba", department_name: "Business Analytics" },
        { department_code: "af", department_name: "Accounting & Finance" },
        { department_code: "ee", department_name: "Electrical Engineering" },
        { department_code: "ce", department_name: "Civil Engineering" },
        { department_code: "ceg", department_name: "Computer Engineering" },
      ],
      {
        ignoreDuplicates: true, // Skip if already exists
        returning: true,
      }
    );

    const campuses = await Campus.bulkCreate(
      [
        { campus_name: "Karachi" },
        { campus_name: "Lahore" },
        { campus_name: "Islamabad" },
        { campus_name: "Peshawar" },
        { campus_name: "Faisalabad" },
      ],
      {
        ignoreDuplicates: true,
        returning: true,
      }
    );

    console.log("\nDepts and Campuses data seeded successfully!");

    await sequelize.close();
  } catch (error) {
    console.error("Seed error:", error);
    await sequelize.close();
  }
};

seedStaticData();
