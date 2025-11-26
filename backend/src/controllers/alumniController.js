import {
  Alumni,
  User,
  Department,
  Campus,
  Company,
  JobRole,
  City,
  Country,
  Experience,
  Skill,
} from "../models/index.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getUserIncludes,
  transformUserData,
} from "../utils/controllerHelper.js";
import { Op } from "sequelize";

export const getAlumniById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { public_id: id },
    include: getUserIncludes(),
  });

  if (!user || user.user_type !== "alumni") {
    throw new AppError("Alumni not found", 404);
  }
  const userData = transformUserData(user);

  return res.status(200).json({
    success: true,
    data: {
      alumni: userData,
    },
  });
});
export const getAllAlumni = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    searchAttribute = "name", // What field to search: name, company, city, country, position, expertise
    searchQuery = "", // The actual search text
    department,
    graduationYear,
    sortBy = "graduationYear",
    sortOrder = "desc",
  } = req.query;

  // Validate pagination
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit))); // Max 50 per page
  const offset = (pageNum - 1) * limitNum;

  // Validate search attribute
  const validSearchAttributes = [
    "name",
    "company",
    "city",
    "country",
    "position",
    "expertise",
  ];
  const searchField = validSearchAttributes.includes(searchAttribute)
    ? searchAttribute
    : "name";

  const whereClause = {};

  const hasSearch = searchQuery && searchQuery.trim();

  if (hasSearch) {
    const searchTerm = searchQuery.trim();

    switch (searchField) {
      case "name":
        whereClause[Op.or] = [
          { first_name: { [Op.iLike]: `%${searchTerm}%` } },
          { last_name: { [Op.iLike]: `%${searchTerm}%` } },
        ];
        break;

      case "company":
        whereClause[Op.or] = [
          {
            "$currentCompany.company_name$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            "$experiences.company.company_name$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ];
        break;

      case "city":
        whereClause[Op.or] = [
          {
            "$currentCity.city_name$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            "$experiences.city.city_name$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ];
        break;

      case "country":
        whereClause[Op.or] = [
          {
            "$currentCity.country.country_name$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            "$experiences.city.country.country_name$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ];
        break;

      case "position":
        whereClause[Op.or] = [
          {
            "$currentJob.job_title$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            "$experiences.jobRole.job_title$": {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ];
        break;

      case "expertise":
        whereClause["$skills.skill_name$"] = {
          [Op.iLike]: `%${searchTerm}%`,
        };
        break;
    }
  }

  if (department) {
    whereClause["$department.department_code$"] = department;
  }

  if (graduationYear) {
    const year = parseInt(graduationYear);
    if (!isNaN(year)) {
      whereClause.graduation_year = year;
    }
  }

  const includes = [
    {
      model: User,
      as: "user",
      attributes: ["public_id"],
    },
    {
      model: Department,
      as: "department",
      attributes: ["department_code", "department_name"],
    },
    {
      model: Campus,
      as: "campus",
      attributes: ["campus_name"],
    },
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
    {
      model: City,
      as: "currentCity",
      attributes: ["city_name"],
      include: [
        {
          model: Country,
          as: "country",
          attributes: ["country_name"],
        },
      ],
    },
    {
      model: Experience,
      as: "experiences",
      attributes: ["experience_id", "start_year", "end_year", "is_current"],
      include: [
        {
          model: Company,
          as: "company",
          attributes: ["company_name"],
        },
        {
          model: JobRole,
          as: "jobRole",
          attributes: ["job_title"],
        },
        {
          model: City,
          as: "city",
          attributes: ["city_name"],
          include: [
            {
              model: Country,
              as: "country",
              attributes: ["country_name"],
              required: hasSearch && searchField === "country",
            },
          ],
        },
      ],
    },
    {
      model: Skill,
      as: "skills",
      attributes: ["skill_id", "skill_name"],
      through: { attributes: [] },
    },
  ];

  const order = [];
  const validSortFields = ["graduationYear", "name"];
  const sortField = validSortFields.includes(sortBy)
    ? sortBy
    : "graduationYear";
  const sortDirection = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

  if (sortField === "name") {
    order.push(["first_name", sortDirection]);
    order.push(["last_name", sortDirection]);
  } else if (sortField === "graduationYear") {
    order.push(["graduation_year", sortDirection]);
  }

  const { count, rows: alumni } = await Alumni.findAndCountAll({
    where: whereClause,
    include: includes,
    limit: limitNum,
    offset: offset,
    order: order,
    subQuery: false, // Important for complex queries with associations
    distinct: true, // Ensures correct count with many-to-many relationships
  });

  const transformedAlumni = alumni.map((alum) => {
    return {
      publicId: alum.user?.public_id || null,
      name: `${alum.first_name} ${alum.last_name}`,
      firstName: alum.first_name,
      lastName: alum.last_name,
      department: alum.department?.department_name || null,
      departmentCode: alum.department?.department_code || null,
      graduationYear: alum.graduation_year,
      campus: alum.campus?.campus_name || null,
      currentCompany: alum.currentCompany?.company_name || null,
      currentPosition: alum.currentJob?.job_title || null,
      currentCity: alum.currentCity?.city_name || null,
      currentCountry: alum.currentCity?.country?.country_name || null,
      profilePicture: alum.pfp_url,
      linkedin: alum.linkedin_url,
      experienceCount: alum.experiences?.length || 0,
      skills: alum.skills?.map((skill) => skill.skill_name) || [],
      previousCompanies:
        alum.experiences?.map((exp) => ({
          company: exp.company.company_name || null,
          position: exp.jobRole.job_title || null,
          city: exp.city?.city_name || null,
          country: exp.city?.country?.country_name || null,
          from: exp.start_year,
          to: exp.end_year,
        })) || [],
    };
  });

  // calculate pagination metadata
  const totalPages = Math.ceil(count / limitNum);
  const hasNextPage = pageNum < totalPages;
  const hasPrevPage = pageNum > 1;

  return res.status(200).json({
    success: true,
    data: {
      alumni: transformedAlumni,
      pagination: {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
      filters: {
        searchAttribute: searchField,
        searchQuery: searchQuery || null,
        department: department || null,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        sortBy: sortField,
        sortOrder: sortDirection.toLowerCase(),
      },
    },
  });
});
