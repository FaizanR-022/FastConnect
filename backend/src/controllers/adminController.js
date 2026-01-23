import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { User, Student, Department, Campus } from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const getAllStudents = asyncHandler(async (req, res) => {
  if (req.user.email !== ADMIN_EMAIL) {
    throw new AppError("Access denied. Admin only.", 403);
  }

  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
  const offset = Math.max(0, parseInt(req.query.offset) || 0);

  const { department, campus, batch, search } = req.query;

  const userWhereClause = {
    user_type: "student",
  };

  const studentWhereClause = {};

  if (department) {
    // We'll filter by department through the include
  }

  if (campus) {
    // We'll filter by campus through the include
  }

  if (batch) {
    const batchYear = parseInt(batch);
    if (!isNaN(batchYear)) {
      studentWhereClause.batch_year = batchYear;
    }
  }

  if (search && search.trim()) {
    const searchTerm = search.trim();
    studentWhereClause[Op.or] = [
      { first_name: { [Op.iLike]: `%${searchTerm}%` } },
      { last_name: { [Op.iLike]: `%${searchTerm}%` } },
    ];
  }

  const { count, rows: students } = await User.findAndCountAll({
    where: userWhereClause,
    include: [
      {
        model: Student,
        as: "studentProfile",
        where:
          Object.keys(studentWhereClause).length > 0
            ? studentWhereClause
            : undefined,
        required: true,
        include: [
          {
            model: Department,
            as: "department",
            where: department ? { department_code: department } : undefined,
            attributes: ["department_code", "department_name"],
          },
          {
            model: Campus,
            as: "campus",
            where: campus ? { campus_name: campus } : undefined,
            attributes: ["campus_name"],
          },
        ],
      },
    ],
    attributes: [
      "public_id",
      "email",
      "is_email_verified",
      "createdAt",
      "last_login",
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    distinct: true,
  });

  const transformedStudents = students.map((student) => ({
    id: student.public_id,
    email: student.email,
    firstName: student.studentProfile.first_name,
    lastName: student.studentProfile.last_name,
    fullName: `${student.studentProfile.first_name} ${student.studentProfile.last_name}`,
    department: student.studentProfile.department.department_name,
    departmentCode: student.studentProfile.department.department_code,
    campus: student.studentProfile.campus.campus_name,
    batch: student.studentProfile.batch_year,
    profilePicture: student.studentProfile.pfp_url,
    isEmailVerified: student.is_email_verified,
    joinedAt: student.createdAt,
    lastLogin: student.last_login,
  }));

  const hasMore = offset + limit < count;

  return res.status(200).json({
    success: true,
    data: {
      students: transformedStudents,
      pagination: {
        total: count,
        limit,
        offset,
        hasMore,
      },
    },
  });
});
