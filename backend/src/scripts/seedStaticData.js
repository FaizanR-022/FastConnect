// import { Department, Campus, sequelize } from "../models/index.js";
// import dotenv from "dotenv";

// dotenv.config();

// const seedStaticData = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connected to database");

//     const departments = await Department.bulkCreate(
//       [
//         { department_code: "cs", department_name: "Computer Science" },
//         { department_code: "se", department_name: "Software Engineering" },
//         { department_code: "ai", department_name: "Artificial Intelligence" },
//         { department_code: "ds", department_name: "Data Science" },
//         { department_code: "cys", department_name: "Cyber Security" },
//         { department_code: "ft", department_name: "Financial Technology" },
//         { department_code: "ba", department_name: "Business Administration" },
//         { department_code: "bsba", department_name: "Business Analytics" },
//         { department_code: "af", department_name: "Accounting & Finance" },
//         { department_code: "ee", department_name: "Electrical Engineering" },
//         { department_code: "ce", department_name: "Civil Engineering" },
//         { department_code: "ceg", department_name: "Computer Engineering" },
//       ],
//       {
//         ignoreDuplicates: true, // Skip if already exists
//         returning: true,
//       }
//     );

//     const campuses = await Campus.bulkCreate(
//       [
//         { campus_name: "Karachi" },
//         { campus_name: "Lahore" },
//         { campus_name: "Islamabad" },
//         { campus_name: "Peshawar" },
//         { campus_name: "Faisalabad" },
//       ],
//       {
//         ignoreDuplicates: true,
//         returning: true,
//       }
//     );

//     console.log("\nDepts and Campuses data seeded successfully!");

//     await sequelize.close();
//   } catch (error) {
//     console.error("Seed error:", error);
//     await sequelize.close();
//   }
// };

// seedStaticData();

export async function autoSeedStaticData() {
  try {
    const { Department, Campus } = await import("./models/index.js");

    // Check if data already exists
    const deptCount = await Department.count();
    const campusCount = await Campus.count();

    if (deptCount > 0 && campusCount > 0) {
      console.log("Static data already seeded. Skipping...");
      return;
    }

    console.log("Seeding static data...");

    // Seed departments
    await Department.bulkCreate(
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
      { ignoreDuplicates: true }
    );

    // Seed campuses
    await Campus.bulkCreate(
      [
        { campus_name: "Karachi" },
        { campus_name: "Lahore" },
        { campus_name: "Islamabad" },
        { campus_name: "Peshawar" },
        { campus_name: "Faisalabad" },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Static data seeded successfully!");
  } catch (error) {
    console.error("Error seeding static data:", error);
    // Don't crash the server if seeding fails
    // The app can still run, users just need to add data manually
  }
}
