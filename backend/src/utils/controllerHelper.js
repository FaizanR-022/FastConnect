import {
  User,
  Student,
  Alumni,
  Department,
  Campus,
  Company,
  JobRole,
  City,
  Country,
  Experience,
  Skill,
} from "../models/index.js";

export const getUserIncludes = () => [
  {
    model: Student,
    as: "studentProfile",
    include: [
      { model: Department, as: "department" },
      { model: Campus, as: "campus" },
    ],
  },
  {
    model: Alumni,
    as: "alumniProfile",
    include: [
      { model: Department, as: "department" },
      { model: Campus, as: "campus" },
      { model: Company, as: "currentCompany" },
      { model: JobRole, as: "currentJob" },
      {
        model: City,
        as: "currentCity",
        include: [{ model: Country, as: "country" }],
      },
      {
        model: Experience,
        as: "experiences",
        include: [
          { model: Company, as: "company" },
          { model: JobRole, as: "jobRole" },
        ],
      },
      {
        model: Skill,
        as: "skills",
        through: { attributes: [] }, // Don't include connecting table fields
      },
    ],
  },
];

export const transformUserData = (user) => {
  if (user.user_type === "student") {
    const student = user.studentProfile;
    return {
      id: user.public_id,
      email: user.email,
      role: user.user_type,
      firstName: student.first_name,
      lastName: student.last_name,
      fullName: `${student.first_name} ${student.last_name}`,
      department: student.department.department_name,
      departmentCode: student.department.department_code,
      batch: student.batch_year,
      campus: student.campus.campus_name,
      profilePicture: student.pfp_url,
    };
  } else if (user.user_type === "alumni") {
    const alumni = user.alumniProfile;
    const previousExperiences = alumni.experiences.map((exp) => ({
      id: exp.experience_id,
      company: exp.company.company_name,
      position: exp.jobRole.job_title,
      from: exp.start_year,
      to: exp.end_year,
    }));
    const skills = alumni.skills.map((skill) => ({
      id: skill.skill_id,
      name: skill.skill_name,
    }));

    return {
      id: user.public_id,
      email: user.email,
      role: user.user_type,
      firstName: alumni.first_name,
      lastName: alumni.last_name,
      fullName: `${alumni.first_name} ${alumni.last_name}`,
      phone: alumni.phone_number,
      department: alumni.department.department_name,
      departmentCode: alumni.department.department_code,
      graduationYear: alumni.graduation_year,
      campus: alumni.campus.campus_name,
      currentCompany: alumni.currentCompany?.company_name || null,
      currentPosition: alumni.currentJob?.job_title || null,
      currentCity: alumni.currentCity?.city_name || null,
      currentCountry: alumni.currentCity?.country?.country_name || null,
      linkedIn: alumni.linkedin_url,
      profilePicture: alumni.pfp_url,
      previousExperiences,
      skills,
    };
  }
};

export const getArrayDiff = (
  existingItems,
  incomingItems = [],
  existingIdField
) => {
  const idField = "id";

  const incomingIds = incomingItems
    .filter((item) => item[idField])
    .map((item) => item[idField]);

  const existingIds = existingItems.map((item) => item[existingIdField]);

  const toUpdate = incomingItems.filter((item) => item[idField]);
  const toCreate = incomingItems.filter((item) => !item[idField]);
  const toDelete = existingIds.filter((id) => !incomingIds.includes(id));

  return { toUpdate, toCreate, toDelete };
};
