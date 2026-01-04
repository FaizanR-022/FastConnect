import {
  User,
  Student,
  sequelize,
  Department,
  Campus,
  Alumni,
  Company,
  JobRole,
  City,
  Country,
  Experience,
  OTP,
} from "../models/index.js";
import { comparePassword, hashPassword } from "../utils/passwordHelper.js";
import { generateToken } from "../utils/jwtHelper.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getUserIncludes,
  transformUserData,
} from "../utils/controllerHelper.js";
import {
  checkOTPAttempts,
  createAndSendOTP,
  verifyOTP,
} from "../utils/otpHelper.js";
import { Op } from "sequelize";

export const signupStudent = asyncHandler(async (req, res) => {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    department,
    batch,
    campus,
    password,
    profilePicture,
  } = req.body;

  if (await User.findOne({ where: { email } })) {
    throw new AppError("User with this email already exists", 400);
  }

  const hashedPassword = await hashPassword(password);

  const dept = await Department.findOne({
    where: { department_code: department },
  });
  const camp = await Campus.findOne({
    where: { campus_name: campus },
  });

  if (!dept || !camp) {
    throw new AppError("Invalid department or campus", 400);
  }

  const result = await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        email,
        password: hashedPassword,
        user_type: "student",
        is_email_verified: false,
      },
      { transaction: t }
    );

    const student = await Student.create(
      {
        user_id: user.user_id,
        first_name,
        last_name,
        department_id: dept.department_id,

        campus_id: camp.campus_id,

        batch_year: batch,
        pfp_url: profilePicture,
      },
      { transaction: t }
    );
    return { user, student };
  });

  const otpResult = await createAndSendOTP(result.user);

  const token = generateToken({
    userId: result.user.public_id,
    userType: result.user.user_type,
  });

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: result.user.public_id,
        email: result.user.email,
        role: result.user.user_type,
        firstName: result.student.first_name,
        lastName: result.student.last_name,
        fullName: `${result.student.first_name} ${result.student.last_name}`,
        batch: result.student.batch_year,
        department: dept.department_name,
        departmentCode: dept.department_code,
        campus: camp.campus_name,
        profilePicture: result.student.pfp_url,
        isEmailVerified: false,
      },
    },
  });
});

export const signupAlumni = asyncHandler(async (req, res) => {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    phone,
    department,
    graduationYear: graduation_year,
    campus,
    currentCompany: current_company,
    currentPosition: current_position,
    previousCompanies: previous_companies,
    city,
    country,
    password,
    linkedin,
    profilePicture,
  } = req.body;

  if (await User.findOne({ where: { email } })) {
    throw new AppError("User with this email already exists", 400);
  }

  const hashedPassword = await hashPassword(password);

  const dept = await Department.findOne({
    where: { department_code: department },
  });
  const camp = await Campus.findOne({
    where: { campus_name: campus },
  });

  if (!dept || !camp) {
    throw new AppError("Invalid department or campus", 400);
  }

  // No error checking for next two variables as there's no option of value being empty as if not exist, it is created

  const [curr_company] = await Company.findOrCreate({
    where: { company_name: current_company },
    defaults: { company_name: current_company },
  });

  const [curr_position] = await JobRole.findOrCreate({
    where: { job_title: current_position },
    defaults: { job_title: current_position },
  });

  const [countri] = await Country.findOrCreate({
    where: { country_name: country },
    defaults: {
      country_name: country,
      country_code: country.substring(0, 3).toUpperCase(),
    },
  });

  const [citi] = await City.findOrCreate({
    where: {
      city_name: city,
      country_id: countri.country_id,
    },
    defaults: {
      city_name: city,
      country_id: countri.country_id,
    },
  });

  // Here if alumni or student fails, they will throw an error and due to transaction function, whole transaction will be reverted
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        email,
        password: hashedPassword,
        user_type: "alumni",
      },
      { transaction: t }
    );

    const alumni = await Alumni.create(
      {
        user_id: user.user_id,
        first_name,
        last_name,
        phone_number: phone,
        department_id: dept.department_id,
        campus_id: camp.campus_id,
        graduation_year,
        current_job_id: curr_position.job_id,
        current_company_id: curr_company.company_id,
        current_city_id: citi.city_id,
        pfp_url: profilePicture,
        linkedin_url: linkedin,
      },
      { transaction: t }
    );

    let experiences = [];

    if (previous_companies && previous_companies.length > 0) {
      for (const prev of previous_companies) {
        const [prevCompany] = await Company.findOrCreate({
          where: { company_name: prev.company },
          defaults: { company_name: prev.company },
          transaction: t,
        });

        const [prevJob] = await JobRole.findOrCreate({
          where: { job_title: prev.role },
          defaults: { job_title: prev.role },
          transaction: t,
        });

        const experience = await Experience.create(
          {
            alumni_id: alumni.alumni_id,
            company_id: prevCompany.company_id,
            job_id: prevJob.job_id,
            is_current: false,
            start_year: prev.from,
            end_year: prev.to,
            city_id: null, // handle city per experience if needed
          },
          { transaction: t }
        );

        experiences.push({
          company: prevCompany.company_name,
          role: prevJob.job_title,
          from: experience.start_year,
          to: experience.end_year,
        });
      }
    }

    return { user, alumni, experiences };
  });

  const otpResult = await createAndSendOTP(result.user);

  const token = generateToken({
    userId: result.user.public_id,
    userType: result.user.user_type,
  });

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: result.user.public_id,
        email: result.user.email,
        role: result.user.user_type,
        firstName: result.alumni.first_name,
        lastName: result.alumni.last_name,
        fullName: `${result.alumni.first_name} ${result.alumni.last_name}`,
        phone: result.alumni.phone_number,
        graduationYear: graduation_year,
        department: dept.department_name,
        departmentCode: dept.department_code,
        campus: camp.campus_name,
        currentPosition: curr_position.job_title,
        currentCompany: curr_company.company_name,
        currentCity: citi.city_name,
        currentCountry: countri.country_name,
        profilePicture: result.alumni.pfp_url,
        linkedin: result.alumni.linkedin_url,
        previousExperiences: result.experiences,
        isEmailVerified: false,
      },
    },
  });
});

export const verifySignupOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user_id = req.user.user_id;

  if (!otp) {
    throw new AppError("OTP is required", 400);
  }

  const user = await User.findOne({
    where: {
      user_id,
      is_email_verified: false,
    },
    include: getUserIncludes(),
  });

  if (!user) {
    throw new AppError("User not found or already verified", 404);
  }

  const attemptsCheck = await checkOTPAttempts(user_id);
  if (attemptsCheck.locked) {
    throw new AppError(attemptsCheck.message, 429);
  }

  const verification = await verifyOTP(user_id, otp);

  if (!verification.valid) {
    throw new AppError(verification.reason, 400);
  }

  await user.update({
    is_email_verified: true,
    last_login: new Date(),
  });

  const userData = transformUserData(user);

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
    data: {
      user: {
        ...userData,
        isEmailVerified: true,
      },
    },
  });
});

export const resendSignupOTP = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;

  const user = await User.findOne({
    where: {
      user_id,
      is_email_verified: false,
    },
  });

  if (!user) {
    throw new AppError("User not found or already verified", 404);
  }

  const recentOTP = await OTP.findOne({
    where: {
      user_id,
      createdAt: {
        [Op.gt]: new Date(Date.now() - 60 * 1000), // Last 60 seconds
      },
    },
  });

  if (recentOTP) {
    throw new AppError(
      "Please wait 60 seconds before requesting a new OTP",
      429
    );
  }

  const otpResult = await createAndSendOTP(user);

  if (!otpResult.success) {
    throw new AppError("Failed to send OTP. Please try again.", 500);
  }

  return res.status(200).json({
    success: true,
    message: "New verification code sent to your email",
    data: {
      expiresAt: otpResult.expiresAt,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({
    where: { email },
    include: getUserIncludes(),
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  await user.update({ last_login: new Date() });

  const token = generateToken({
    userId: user.public_id,
    userType: user.user_type,
    rememberMe: rememberMe || false,
  });

  const userData = transformUserData(user);

  return res.status(200).json({
    success: true,
    data: {
      token,
      user: userData,
    },
  });
});
