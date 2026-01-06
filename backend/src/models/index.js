import { sequelize } from "../config/database.js";
import User from "./User.js";
import Student from "./Student.js";
import Alumni from "./Alumni.js";
import Country from "./Country.js";
import City from "./City.js";
import Campus from "./Campus.js";
import Department from "./Department.js";
import Company from "./Company.js";
import JobRole from "./JobRole.js";
import Skill from "./Skill.js";
import Experience from "./Experience.js";
import AlumniSkill from "./AlumniSkill.js";
import Post from "./Post.js";
import Reply from "./Reply.js";
import PostLike from "./PostLike.js";
import OTP from "./OTP.js";
import Notification from "./Notification.js";

// User - Student (One to One)
User.hasOne(Student, {
  foreignKey: "user_id",
  as: "studentProfile",
});
Student.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// User - Alumni (One to One)
User.hasOne(Alumni, {
  foreignKey: "user_id",
  as: "alumniProfile",
});
Alumni.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Country - Cities (One to Many)
Country.hasMany(City, {
  foreignKey: "country_id",
  as: "cities",
});
City.belongsTo(Country, {
  foreignKey: "country_id",
  as: "country",
});

// Department - Students (One to Many)
Department.hasMany(Student, {
  foreignKey: "department_id",
  as: "students",
});
Student.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});

// Department - Alumni (One to Many)
Department.hasMany(Alumni, {
  foreignKey: "department_id",
  as: "alumni",
});
Alumni.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});

// Campus - Students (One to Many)
Campus.hasMany(Student, {
  foreignKey: "campus_id",
  as: "students",
});
Student.belongsTo(Campus, {
  foreignKey: "campus_id",
  as: "campus",
});

// Campus - Alumni (One to Many)
Campus.hasMany(Alumni, {
  foreignKey: "campus_id",
  as: "alumni",
});
Alumni.belongsTo(Campus, {
  foreignKey: "campus_id",
  as: "campus",
});

// Alumni - Experiences (One to Many)
Alumni.hasMany(Experience, {
  foreignKey: "alumni_id",
  as: "experiences",
});
Experience.belongsTo(Alumni, {
  foreignKey: "alumni_id",
  as: "alumni",
});

// Company - Experiences (One to Many)
Company.hasMany(Experience, {
  foreignKey: "company_id",
  as: "experiences",
});
Experience.belongsTo(Company, {
  foreignKey: "company_id",
  as: "company",
});

// JobRole - Experiences (One to Many)
JobRole.hasMany(Experience, {
  foreignKey: "job_id",
  as: "experiences",
});
Experience.belongsTo(JobRole, {
  foreignKey: "job_id",
  as: "jobRole",
});

// City - Experiences (One to Many)
City.hasMany(Experience, {
  foreignKey: "city_id",
  as: "experiences",
});
Experience.belongsTo(City, {
  foreignKey: "city_id",
  as: "city",
});

// JobRole - Alumni (current job) (One to Many)
JobRole.hasMany(Alumni, {
  foreignKey: "current_job_id",
  as: "currentAlumni",
});
Alumni.belongsTo(JobRole, {
  foreignKey: "current_job_id",
  as: "currentJob",
});

// Company - Alumni (current company) (One to Many)
Company.hasMany(Alumni, {
  foreignKey: "current_company_id",
  as: "currentAlumni",
});
Alumni.belongsTo(Company, {
  foreignKey: "current_company_id",
  as: "currentCompany",
});

// City - Alumni (current city) (One to Many)
City.hasMany(Alumni, {
  foreignKey: "current_city_id",
  as: "currentAlumni",
});
Alumni.belongsTo(City, {
  foreignKey: "current_city_id",
  as: "currentCity",
});

// Alumni - Skills (Many to Many through AlumniSkill)
Alumni.belongsToMany(Skill, {
  through: AlumniSkill,
  foreignKey: "alumni_id", // Fk in Alumni
  otherKey: "skill_id", // Fk in skills
  as: "skills",
});
Skill.belongsToMany(Alumni, {
  through: AlumniSkill,
  foreignKey: "skill_id",
  otherKey: "alumni_id",
  as: "alumni",
});
AlumniSkill.belongsTo(Skill, {
  foreignKey: "skill_id",
  as: "skill",
});

AlumniSkill.belongsTo(Alumni, {
  foreignKey: "alumni_id",
  as: "alumni",
});

// User - Posts (One to Many)
User.hasMany(Post, {
  foreignKey: "user_id",
  as: "posts",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
  as: "author",
});

// Post - Replies (One to Many)
Post.hasMany(Reply, {
  foreignKey: "post_id",
  as: "replies",
});
Reply.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
});

// Alumni - Replies (One to Many)
Alumni.hasMany(Reply, {
  foreignKey: "alumni_id",
  as: "replies",
});
Reply.belongsTo(Alumni, {
  foreignKey: "alumni_id",
  as: "author",
});

// User - PostLikes (One to Many)
User.hasMany(PostLike, {
  foreignKey: "user_id",
  as: "postLikes",
});
PostLike.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Post - PostLikes (One to Many)
Post.hasMany(PostLike, {
  foreignKey: "post_id",
  as: "likes",
});
PostLike.belongsTo(Post, {
  foreignKey: "post_id",
  as: "post",
});

// Post - Users through PostLikes (Many to Many)
Post.belongsToMany(User, {
  through: PostLike,
  foreignKey: "post_id",
  otherKey: "user_id",
  as: "likedByUsers",
});
User.belongsToMany(Post, {
  through: PostLike,
  foreignKey: "user_id",
  otherKey: "post_id",
  as: "likedPosts",
});

// User - OTP (One to Many)
User.hasMany(OTP, {
  foreignKey: "user_id",
  as: "otps",
});
OTP.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Notification, {
  foreignKey: "recipient_id",
  as: "receivedNotifications",
});
Notification.belongsTo(User, {
  foreignKey: "recipient_id",
  as: "recipient",
});

User.hasMany(Notification, {
  foreignKey: "actor_id",
  as: "triggeredNotifications",
});
Notification.belongsTo(User, {
  foreignKey: "actor_id",
  as: "actor",
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // alter updates tables without dropping
    console.log("Database synced successfully!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

export {
  sequelize,
  User,
  Student,
  Alumni,
  Country,
  City,
  Campus,
  Department,
  Company,
  JobRole,
  Skill,
  Experience,
  AlumniSkill,
  Post,
  Reply,
  PostLike,
  OTP,
  Notification,
  syncDatabase,
};
