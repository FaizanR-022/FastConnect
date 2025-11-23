import {
  Company,
  JobRole,
  City,
  Country,
  Experience,
  AlumniSkill,
  Skill,
} from "../models/index.js";
import { getArrayDiff } from "./controllerHelper.js";

/**
 * Update alumni experiences (add/edit/delete)
 */
export const updateAlumniExperiences = async (
  alumniId,
  previousExperiences,
  transaction
) => {
  if (!previousExperiences) return;

  const existingExperiences = await Experience.findAll({
    where: { alumni_id: alumniId },
    attributes: ["experience_id"],
    transaction,
  });

  const { toUpdate, toCreate, toDelete } = getArrayDiff(
    existingExperiences,
    previousExperiences,
    "experience_id"
  );

  if (toDelete.length > 0) {
    await Experience.destroy({
      where: { experience_id: toDelete },
      transaction,
    });
  }

  for (const exp of toUpdate) {
    const [company] = await Company.findOrCreate({
      where: { company_name: exp.company },
      defaults: { company_name: exp.company },
      transaction,
    });

    const [jobRole] = await JobRole.findOrCreate({
      where: { job_title: exp.role },
      defaults: { job_title: exp.role },
      transaction,
    });

    await Experience.update(
      {
        company_id: company.company_id,
        job_id: jobRole.job_id,
        start_year: exp.from,
        end_year: exp.to,
      },
      {
        where: { experience_id: exp.id },
        transaction,
      }
    );
  }

  for (const exp of toCreate) {
    const [company] = await Company.findOrCreate({
      where: { company_name: exp.company },
      defaults: { company_name: exp.company },
      transaction,
    });

    const [jobRole] = await JobRole.findOrCreate({
      where: { job_title: exp.role },
      defaults: { job_title: exp.role },
      transaction,
    });

    await Experience.create(
      {
        alumni_id: alumniId,
        company_id: company.company_id,
        job_id: jobRole.job_id,
        is_current: false,
        start_year: exp.from,
        end_year: exp.to,
      },
      { transaction }
    );
  }
};

/**
 * Update alumni skills (add/keep/delete)
 */
export const updateAlumniSkills = async (alumniId, skills, transaction) => {
  if (!skills) return;

  const existingAlumniSkills = await AlumniSkill.findAll({
    where: { alumni_id: alumniId },
    attributes: ["skill_id"],
    transaction,
  });
  // Output: (Array of objects containing ids)
  // AlumniSkill { skill_id: 10 },
  // AlumniSkill { skill_id: 15 },
  // AlumniSkill { skill_id: 20 }

  // Output: [10, 15, 20] (array of ids)

  const { toUpdate, toCreate, toDelete } = getArrayDiff(
    existingAlumniSkills,
    skills,
    "skill_id"
  );

  if (toDelete.length > 0) {
    await AlumniSkill.destroy({
      where: {
        alumni_id: alumniId,
        skill_id: toDelete,
      },
      transaction,
    });
  }

  // For skills, toUpdate items already exist - nothing to update
  // (Skills only have a name, which is their identifier)

  for (const skill of toCreate) {
    const [skillRecord] = await Skill.findOrCreate({
      where: { skill_name: skill.name },
      defaults: { skill_name: skill.name },
      transaction,
    });

    await AlumniSkill.create(
      {
        alumni_id: alumniId,
        skill_id: skillRecord.skill_id,
      },
      { transaction }
    );
  }
};

/**
 * Update alumni current company, position, and city
 */
export const updateAlumniCurrentInfo = async (
  alumni,
  { currentCompany, currentPosition, city, country },
  transaction
) => {
  const updateData = {};

  if (
    currentCompany &&
    alumni.currentCompany?.company_name !== currentCompany
  ) {
    const [currCompany] = await Company.findOrCreate({
      where: { company_name: currentCompany },
      defaults: { company_name: currentCompany },
      transaction,
    });

    updateData.current_company_id = currCompany.company_id;
  }

  if (currentPosition && alumni.currentJob?.job_title !== currentPosition) {
    const [currJob] = await JobRole.findOrCreate({
      where: { job_title: currentPosition },
      defaults: { job_title: currentPosition },
      transaction,
    });

    updateData.current_job_id = currJob.job_id;
  }

  if (
    country &&
    city &&
    alumni.currentCity?.country?.country_name !== country
  ) {
    // Find/create country AND city
    const [currCountry] = await Country.findOrCreate({
      where: { country_name: country },
      defaults: {
        country_name: country,
        country_code: country.substring(0, 3).toUpperCase(),
      },
      transaction,
    });

    const [currCity] = await City.findOrCreate({
      where: { city_name: city, country_id: currCountry.country_id },
      defaults: { city_name: city, country_id: currCountry.country_id },
      transaction,
    });

    updateData.current_city_id = currCity.city_id;
  }
  //
  else if (city && alumni.currentCity?.city_name !== city) {
    // Just find/create city with same country
    const currCountry = alumni.currentCity.country;
    const [currCity] = await City.findOrCreate({
      where: { city_name: city, country_id: currCountry.country_id },
      defaults: { city_name: city, country_id: currCountry.country_id },
      transaction,
    });

    updateData.current_city_id = currCity.city_id;
  }

  return updateData;
};
