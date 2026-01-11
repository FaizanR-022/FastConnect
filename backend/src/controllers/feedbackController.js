import { Feedback, User, Student, Alumni } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

// For now, only first controller (createFeedback) is being used on the client(frontend).

export const createFeedback = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user_id = req.user.user_id;

  const feedback = await Feedback.create({
    user_id,
    subject,
    message,
  });

  return res.status(201).json({
    success: true,
    message: "Feedback submitted successfully. Thank you for your input!",
    data: {
      feedback: {
        id: feedback.feedback_id,
        subject: feedback.subject,
        message: feedback.message,
        status: feedback.status,
        createdAt: feedback.createdAt,
      },
    },
  });
});

export const getUserFeedbacks = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;

  const feedbacks = await Feedback.findAll({
    where: { user_id },
    order: [["createdAt", "DESC"]],
    limit: 20,
  });

  return res.status(200).json({
    success: true,
    data: {
      feedbacks: feedbacks.map((fb) => ({
        id: fb.feedback_id,
        subject: fb.subject,
        message: fb.message,
        status: fb.status,
        createdAt: fb.createdAt,
      })),
    },
  });
});

// Admin only - Get all feedbacks
export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  const whereClause = {};
  if (status && ["pending", "reviewed", "resolved"].includes(status)) {
    whereClause.status = status;
  }

  const { count, rows: feedbacks } = await Feedback.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["public_id", "email", "user_type"],
        include: [
          {
            model: Student,
            as: "studentProfile",
            attributes: ["first_name", "last_name"],
          },
          {
            model: Alumni,
            as: "alumniProfile",
            attributes: ["first_name", "last_name"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: limitNum,
    offset,
  });

  const transformedFeedbacks = feedbacks.map((fb) => {
    const profile =
      fb.user.user_type === "student"
        ? fb.user.studentProfile
        : fb.user.alumniProfile;

    return {
      id: fb.feedback_id,
      subject: fb.subject,
      message: fb.message,
      status: fb.status,
      createdAt: fb.createdAt,
      user: {
        id: fb.user.public_id,
        email: fb.user.email,
        name: `${profile?.first_name} ${profile?.last_name}`,
        role: fb.user.user_type,
      },
    };
  });

  return res.status(200).json({
    success: true,
    data: {
      feedbacks: transformedFeedbacks,
      pagination: {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(count / limitNum),
      },
    },
  });
});

// Admin only - Update feedback status
export const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "reviewed", "resolved"].includes(status)) {
    throw new AppError("Invalid status value", 400);
  }

  const feedback = await Feedback.findByPk(id);

  if (!feedback) {
    throw new AppError("Feedback not found", 404);
  }

  await feedback.update({ status });

  return res.status(200).json({
    success: true,
    message: "Feedback status updated successfully",
    data: {
      feedback: {
        id: feedback.feedback_id,
        status: feedback.status,
      },
    },
  });
});
