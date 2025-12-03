import { sequelize } from "../config/database.js";
import {
  Alumni,
  Company,
  JobRole,
  Post,
  PostLike,
  Reply,
  Student,
  User,
} from "../models/index.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const createPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body;

  const user = req.user;

  const post = await Post.create({
    user_id: user.user_id,
    title,
    body,
  });

  let profile;

  if (user.user_type === "student") {
    profile = await Student.findOne({ where: { user_id: user.user_id } });
  } else {
    profile = await Alumni.findOne({ where: { user_id: user.user_id } });
  }

  if (!profile) {
    throw new AppError("User profile not found", 500);
  }

  const data = {
    id: post.post_id,
    title: post.title,
    body: post.body,
    likesCount: post.likes_count,
    createdAt: post.createdAt,
    author: {
      id: user.public_id,
      firstName: profile.first_name,
      lastName: profile.last_name,
      profilePicture: profile.pfp_url,
    },
  };

  return res.status(201).json({
    success: true,
    data: {
      post: data,
    },
  });
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = Math.max(0, parseInt(req.query.offset) || 0);

  const total = await Post.count();

  const posts = await Post.findAll({
    limit,
    offset,
    include: [
      {
        model: User,
        as: "author",
        attributes: ["public_id", "user_type"],
        include: [
          {
            model: Student,
            as: "studentProfile",
            attributes: ["first_name", "last_name", "pfp_url"],
          },
          {
            model: Alumni,
            as: "alumniProfile",
            attributes: ["first_name", "last_name", "pfp_url"],
          },
        ],
      },
    ],
    order: [
      [
        sequelize.literal(
          `("likes_count" * 0.5) - (EXTRACT(EPOCH FROM (NOW() - "Post"."createdAt")) / 86400)`
        ),
        "DESC",
      ],
    ],
  });

  // for batch queries
  const postIds = posts.map((p) => p.post_id);

  // counts replies for each post (using group by)
  const repliesCounts = await Reply.findAll({
    where: { post_id: postIds },
    attributes: [
      "post_id",
      [sequelize.fn("COUNT", sequelize.col("reply_id")), "count"],
    ],
    group: ["post_id"],
    raw: true,
  });

  // To avoid repititive search
  const repliesCountMap = {};
  repliesCounts.forEach((item) => {
    repliesCountMap[item.post_id] = parseInt(item.count);
  });

  const userLikes = await PostLike.findAll({
    where: {
      post_id: postIds,
      user_id: req.user.user_id,
    },
    attributes: ["post_id"],
    raw: true,
  });

  // Set for O(1) lookup
  const likedPostIds = new Set(userLikes.map((like) => like.post_id));

  const transformedPosts = posts.map((post) => {
    const profile =
      post.author.user_type === "student"
        ? post.author.studentProfile
        : post.author.alumniProfile;

    return {
      id: post.post_id,
      title: post.title,
      body: post.body,
      author: {
        id: post.author.public_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: post.author.user_type,
        profilePicture: profile.pfp_url,
      },
      likesCount: post.likes_count,
      repliesCount: repliesCountMap[post.post_id] || 0,
      isLikedByCurrentUser: likedPostIds.has(post.post_id),
      createdAt: post.createdAt,
    };
  });

  const hasMore = offset + limit < total;

  return res.status(200).json({
    success: true,
    data: {
      posts: transformedPosts,
      pagination: {
        total,
        limit,
        offset,
        hasMore,
      },
    },
  });
});

export const getPostReplies = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByPk(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const replies = await Reply.findAll({
    where: { post_id: id },
    include: [
      {
        model: Alumni,
        as: "author",
        attributes: ["first_name", "last_name", "pfp_url"],
        include: [
          {
            model: Company,
            as: "currentCompany",
            attributes: ["company_name"],
          },
          {
            model: JobRole,
            as: "currentJob",
            attributes: ["job_title"],
          },
        ],
      },
    ],
    order: [["createdAt", "ASC"]],
  });

  const transformedReplies = replies.map((reply) => ({
    id: reply.reply_id,
    body: reply.body,
    author: {
      firstName: reply.author.first_name,
      lastName: reply.author.last_name,
      profilePicture: reply.author.pfp_url,
      currentPosition: reply.author.currentJob?.job_title || null,
      currentCompany: reply.author.currentCompany?.company_name || null,
    },
    createdAt: reply.createdAt,
  }));

  return res.status(200).json({
    success: true,
    data: {
      replies: transformedReplies,
    },
  });
});

export const getMyPosts = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;

  const posts = await Post.findAll({
    where: { user_id },
    attributes: ["post_id", "title", "body", "likes_count", "createdAt"],
    order: [["createdAt", "DESC"]],
  });

  const postIds = posts.map((p) => p.post_id);

  const repliesCounts = await Reply.findAll({
    where: { post_id: postIds },
    attributes: [
      "post_id",
      [sequelize.fn("COUNT", sequelize.col("reply_id")), "count"],
    ],
    group: ["post_id"],
    raw: true,
  });

  const repliesCountMap = {};
  repliesCounts.forEach((item) => {
    repliesCountMap[item.post_id] = parseInt(item.count);
  });

  const userLikes = await PostLike.findAll({
    where: {
      post_id: postIds,
      user_id: user_id,
    },
    attributes: ["post_id"],
    raw: true,
  });

  const likedPostIds = new Set(userLikes.map((like) => like.post_id));

  const transformedPosts = posts.map((post) => ({
    id: post.post_id,
    title: post.title,
    body: post.body,
    likesCount: post.likes_count,
    repliesCount: repliesCountMap[post.post_id] || 0,
    isLikedByCurrentUser: likedPostIds.has(post.post_id),
    createdAt: post.createdAt,
  }));

  return res.status(200).json({
    success: true,
    data: {
      posts: transformedPosts,
    },
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;

  const post = await Post.findByPk(id);

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  if (post.user_id !== user_id) {
    throw new AppError("You can only delete your own posts", 403);
  }

  await sequelize.transaction(async (t) => {
    await Reply.destroy({
      where: { post_id: id },
      transaction: t,
    });

    await PostLike.destroy({
      where: { post_id: id },
      transaction: t,
    });

    await post.destroy({ transaction: t });
  });

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

export const createReply = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const user_id = req.user.user_id;
  const user_type = req.user.user_type;

  if (user_type !== "alumni") {
    throw new AppError("Only alumni can reply to posts", 403);
  }

  const post = await Post.findByPk(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const alumni = await Alumni.findOne({ where: { user_id } });
  if (!alumni) {
    throw new AppError("Alumni profile not found", 500);
  }

  const reply = await Reply.create({
    post_id: id,
    alumni_id: alumni.alumni_id,
    body,
  });

  const createdReply = await Reply.findOne({
    where: { reply_id: reply.reply_id },
    include: [
      {
        model: Alumni,
        as: "author",
        attributes: ["first_name", "last_name", "pfp_url"],
        include: [
          {
            model: Company,
            as: "currentCompany",
            attributes: ["company_name"],
          },
          {
            model: JobRole,
            as: "currentJob",
            attributes: ["job_title"],
          },
        ],
      },
    ],
  });

  const responseData = {
    id: createdReply.reply_id,
    body: createdReply.body,
    author: {
      firstName: createdReply.author.first_name,
      lastName: createdReply.author.last_name,
      profilePicture: createdReply.author.pfp_url,
      currentPosition: createdReply.author.currentJob?.job_title || null,
      currentCompany: createdReply.author.currentCompany?.company_name || null,
    },
    createdAt: createdReply.createdAt,
  };

  return res.status(201).json({
    success: true,
    data: {
      reply: responseData,
    },
  });
});

export const deleteReply = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;
  const user_type = req.user.user_type;

  if (user_type !== "alumni") {
    throw new AppError("Only alumni can delete replies", 403);
  }

  const reply = await Reply.findByPk(id);

  if (!reply) {
    throw new AppError("Reply not found", 404);
  }

  const alumni = await Alumni.findOne({ where: { user_id } });
  if (!alumni) {
    throw new AppError("Alumni profile not found", 500);
  }

  if (reply.alumni_id !== alumni.alumni_id) {
    throw new AppError("You can only delete your own replies", 403);
  }

  await reply.destroy();

  return res.status(200).json({
    success: true,
    message: "Reply deleted successfully",
  });
});

export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;

  const post = await Post.findByPk(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const existingLike = await PostLike.findOne({
    where: {
      post_id: id,
      user_id: user_id,
    },
  });

  if (existingLike) {
    throw new AppError("You have already liked this post", 400);
  }

  await sequelize.transaction(async (t) => {
    await PostLike.create(
      {
        post_id: id,
        user_id: user_id,
      },
      { transaction: t }
    );

    await post.increment("likes_count", { transaction: t });
  });

  await post.reload(); // Refresh post data from DB

  return res.status(200).json({
    success: true,
    message: "Post liked successfully",
    data: {
      likesCount: post.likes_count,
    },
  });
});

export const unlikePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.user_id;

  const post = await Post.findByPk(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const existingLike = await PostLike.findOne({
    where: {
      post_id: id,
      user_id: user_id,
    },
  });

  if (!existingLike) {
    throw new AppError("You have not liked this post", 400);
  }

  await sequelize.transaction(async (t) => {
    await existingLike.destroy({ transaction: t });

    await post.decrement("likes_count", { transaction: t });
  });

  await post.reload();

  return res.status(200).json({
    success: true,
    message: "Post unliked successfully",
    data: {
      likesCount: post.likes_count,
    },
  });
});
