import { Users } from '../models/users';
import { ActivityAttributes } from '../models/activities';
import { Feedback } from '../models/feedback';
import { feedbackMapper } from './FeedbackMapper';
import { ActivityApply } from '../models/activity_apply';
import { activityApplyMapper } from './ActivityApplyMapper';
import { Organization } from '../models/organization';
import { SkillActivities } from '../models/skill_activities';
import { Skills } from '../models/skills';

export const mappedActivities = (activities: ActivityAttributes[]) => {
  const result = activities.map(async (activity) => {
    const {
      id,
      name,
      description,
      image,
      location,
      num_of_accepted,
      max_of_volunteers,
      register_from,
      register_to,
      start_date,
      end_date,
      status,
      created_at,
      updated_at,
      creator: creatorId,
    } = activity;
    try {
      const creator = await Users.findByPk(creatorId);
      const creatorName = creator ? creator.name : null;
      const feedbacks = await Feedback.findAll({
        where: { activity_id: id },
      });
      const mappedFeedbacks = await feedbackMapper(feedbacks);
      const volunteersApplied = await ActivityApply.findAll({
        where: { activity_id: id },
      });
      const mappedVolunteersApplied =
        await activityApplyMapper(volunteersApplied);
      // const countVolunteersApplied = await ActivityApply.count({
      //   where: { activity_id: id },
      // });
      const skillsActivity = await SkillActivities.findAll({
        where: { activity_id: id },
      });
      const skillIds = skillsActivity.map((skill) => skill.skill_id);
      const skills = await Skills.findAll({
        where: { id: skillIds },
      });
      const skillsWithDetails = skillsActivity.map((activity) => {
        const skill = skills.find((skill) => skill.id === activity.skill_id);
        return skill;
      });
      const inforOrganizer = await Organization.findOne({
        where: { id: creator?.organization_id },
      });
      return {
        id,
        name,
        description,
        image,
        location,
        num_of_accepted,
        max_of_volunteers,
        register_from,
        register_to,
        start_date,
        end_date,
        status,
        created_at,
        updated_at,
        skillsActivity: skillsWithDetails,
        creator_id: creatorId,
        creator: creatorName,
        feedback: mappedFeedbacks,
        inforOrganizer: inforOrganizer,
        volunteersApplied: mappedVolunteersApplied,
      };
    } catch (error) {
      console.error('Error fetching creator:', error);
      return null;
    }
  });
  return result.filter((activity) => activity !== null);
};
