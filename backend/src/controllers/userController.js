import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import {
  User,
  Student,
  Alumni,
  sequelize,
  Reply,
  Post,
} from "../models/index.js";
import {
  getUserIncludes,
  transformUserData,
} from "../utils/controllerHelper.js";
import {
  updateAlumniExperiences,
  updateAlumniSkills,
  updateAlumniCurrentInfo,
} from "../utils/updateHelpers.js";

// These are all for current User

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { user_id: req.user.user_id },
    include: getUserIncludes(),
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const userData = transformUserData(user);

  return res.status(200).json({
    success: true,
    data: { user: userData },
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { user_id: req.user.user_id },
    include: getUserIncludes(),
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // STUDENT
  if (user.user_type === "student") {
    const {
      firstName: first_name,
      lastName: last_name,
      profilePicture = "",
    } = req.body;

    await Student.update(
      {
        first_name,
        last_name,
        pfp_url: profilePicture,
      },
      { where: { user_id: user.user_id } }
    );

    const updatedUser = await User.findOne({
      where: { user_id: user.user_id },
      include: getUserIncludes(),
    });

    const userData = transformUserData(updatedUser);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: userData },
    });
  }

  // ALUMNI
  else if (user.user_type === "alumni") {
    const {
      firstName,
      lastName,
      phone,
      currentCompany,
      currentPosition,
      currentCity,
      currentCountry,
      linkedin,
      profilePicture,
      previousExperiences = [],
      skills = [],
    } = req.body;

    await sequelize.transaction(async (t) => {
      let updateUser = {};

      if (firstName !== undefined) updateUser.first_name = firstName;
      if (lastName !== undefined) updateUser.last_name = lastName;
      if (phone !== undefined) updateUser.phone_number = phone;
      if (profilePicture !== undefined) updateUser.pfp_url = profilePicture;
      if (linkedin !== undefined) updateUser.linkedin_url = linkedin;

      const alumni = user.alumniProfile;

      // Update current company, position, and city
      const currentInfoUpdates = await updateAlumniCurrentInfo(
        alumni,
        { currentCompany, currentPosition, currentCity, currentCountry },
        t
      );

      Object.assign(updateUser, currentInfoUpdates);

      await Alumni.update(updateUser, {
        where: { user_id: user.user_id },
        transaction: t,
      });

      // Update experiences
      await updateAlumniExperiences(alumni.alumni_id, previousExperiences, t);

      // Update skills
      await updateAlumniSkills(alumni.alumni_id, skills, t);
    });

    const updatedUser = await User.findOne({
      where: { user_id: user.user_id },
      include: getUserIncludes(),
    });

    const userData = transformUserData(updatedUser);
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: userData },
    });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { user_id: req.user.user_id },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await sequelize.transaction(async (t) => {
    if (user.user_type === "student") {
      await Student.destroy({
        where: { user_id: user.user_id },
        transaction: t,
      });
    } else if (user.user_type === "alumni") {
      const alumni = await Alumni.findOne({
        where: { user_id: user.user_id },
        transaction: t,
      });

      if (alumni) {
        // Delete experiences
        await Experience.destroy({
          where: { alumni_id: alumni.alumni_id },
          transaction: t,
        });

        // Delete skills (junction table)
        await AlumniSkill.destroy({
          where: { alumni_id: alumni.alumni_id },
          transaction: t,
        });

        // Soft delete alumni profile
        await Alumni.destroy({
          where: { user_id: user.user_id },
          transaction: t,
        });
      }
    }

    // Soft delete user account
    await User.destroy({
      where: { user_id: user.user_id },
      transaction: t,
    });
  });

  return res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

// To get other User
export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({
    where: { public_id: userId },
    include: getUserIncludes(),
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const userData = transformUserData(user);

  const isOwnProfile = req.user.public_id === userId;

  if (!isOwnProfile) {
    if (userData.role === "student") {
      delete userData.email;
    }
  }

  return res.status(200).json({
    success: true,
    data: { user: userData, isOwnProfile },
  });
});

export const getUserReplies = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({
    where: { public_id: userId },
    attributes: ["user_id", "user_type"],
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.user_type !== "alumni") {
    return res.status(200).json({
      success: true,
      data: { replies: [] },
    });
  }

  const alumni = await Alumni.findOne({
    where: { user_id: user.user_id },
    attributes: ["alumni_id"],
  });

  if (!alumni) {
    return res.status(200).json({
      success: true,
      data: { replies: [] },
    });
  }

  const replies = await Reply.findAll({
    where: { alumni_id: alumni.alumni_id },
    attributes: ["reply_id", "body", "createdAt"],
    include: [
      {
        model: Post,
        as: "post",
        attributes: ["post_id", "title"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 10, // Return last 10 replies
  });

  const transformedReplies = replies.map((reply) => ({
    id: reply.reply_id,
    body: reply.body,
    postId: reply.post.post_id,
    postTitle: reply.post.title,
    createdAt: reply.createdAt,
  }));

  return res.status(200).json({
    success: true,
    data: {
      replies: transformedReplies,
    },
  });
});
