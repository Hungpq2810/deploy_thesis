import { Request, Response } from 'express';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { SkillActivities } from '../models/skill_activities';
import { Activities, ActivityAttributes } from '../models/activities';
export const listActivitesBySkills = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const skills = req.body.skills;
    const uniqueActivityIds = await SkillActivities.findAll({
      attributes: ['activity_id'],
      where: {
        activity_id: skills,
      },
      group: ['activity_id'],
      raw: true,
    });
    if (uniqueActivityIds) {
      const uniqueIds = uniqueActivityIds.map((item) => item.activity_id);
      const activities = await Activities.findAll({
        where: {
          id: uniqueIds,
        },
      });
      const response: GeneralResponse<{
        activities: ActivityAttributes[];
      }> = {
        status: 200,
        data: { activities },
        message: 'Get list of skills successfully',
      };
      commonResponse(req, res, response);
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};
