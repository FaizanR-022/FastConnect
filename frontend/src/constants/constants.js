export const USER_ROLES = {
  STUDENT: "student",
  ALUMNI: "alumni",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP_CHOICE: "/signup",
  SIGNUP_STUDENT: "/signup/student",
  SIGNUP_ALUMNI: "/signup/alumni",
  DASHBOARD: "/dashboard",
  ALUMNI_LIST: "/alumni",
  ALUMNI_PROFILE: "/alumni/:id",
  PROFILE: "/profile",
  POSTS: "/posts",
  MY_POSTS: "/my-posts",
};

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  SIGNUP_STUDENT: "/auth/signup/student",
  SIGNUP_ALUMNI: "/auth/signup/alumni",
  VERIFY_EMAIL: "/auth/verify-email",

  // User
  GET_USER_PROFILE: "/user",
  UPDATE_USER_PROFILE: "/user",
  DELETE_USER_PROFILE: "/user",

  // Alumni
  GET_ALUMNI: "/alumni",
  GET_ALUMNI_BY_ID: "/alumni/:id",
  UPDATE_ALUMNI_PROFILE: "/alumni/profile",

  // Student
  GET_STUDENT_PROFILE: "/student/profile",
  UPDATE_STUDENT_PROFILE: "/student/profile",

  // Posts
  GET_ALL_POSTS: "/posts",
  GET_MY_POSTS: "/posts/my-posts",
  CREATE_POST: "/posts",
  DELETE_POST: "/posts/:id",
  LIKE_POST: "/posts/:id/like",
  UNLIKE_POST: "/posts/:id/like",

  // Replies
  GET_POST_REPLIES: "/posts/:id/replies",
  CREATE_REPLY: "/posts/:id/replies",
  DELETE_REPLY: "/replies/:id",
};

export const EMAIL_DOMAINS = {
  STUDENT: "@nu.edu",
};

export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  STUDENT_EMAIL_REQUIRED: "Please use your @nu.edu email address",
  PASSWORD_MIN: "Password must be at least 8 characters",
  PASSWORD_MISMATCH: "Passwords do not match",
  PHONE_INVALID: "Please enter a valid phone number",
};
