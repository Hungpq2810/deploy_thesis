import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { UserAttributes, Users } from '../models/users';
import { SkillUsers } from '../models/skill_users';
import {
  VolunteerRequest,
  VolunteerRequestAttributes,
} from '../models/volunteer_request';
import { ActivityApply } from '../models/activity_apply';
import { Organization, OrganizationAttributes } from '../models/organization';
import { activityApplyMapper } from '../mapper/ActivityApplyMapper';
import { Skills } from '../models/skills';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decodedToken.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Không tìm thấy user',
      };
      commonResponse(req, res, response);
      return;
    } else {
      if (Array.isArray(req.body.skills) && user.role_id === 1) {
        const skills = req.body.skills.map((skillId: string) => ({
          skill_id: skillId,
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
        }));
        await SkillUsers.destroy({ where: { user_id: userId } });
        for (const skill of skills) {
          await SkillUsers.create(skill);
        }
      }

      const currentRequest = await VolunteerRequest.findOne({
        where: {user_id: user.id}
      })
      console.log(currentRequest?.organization_id);
      
      const requestApplyOrganizer = {
        user_id: Number(userId) as number,
        organization_id: currentRequest?.organization_id || Number(req.body.belongsOrganizer) as number,
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      console.log(requestApplyOrganizer);
      
      await VolunteerRequest.destroy({
        where: {
          user_id: userId,
          organization_id: req.body.belongsOrganizer,
        },
      });
      await VolunteerRequest.create(requestApplyOrganizer);
      const body = req.body;
      // delete body.role_id;
      delete body.organization_id;
      const result = await user.update(body);
      const response: GeneralResponse<UserAttributes> = {
        status: 200,
        data: result.toJSON() as UserAttributes,
        message: 'Update successfully',
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

export const detailUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decodedToken.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Không tìm thấy người dùng',
      };
      commonResponse(req, res, response);
      return;
    }

    const userSkills = await SkillUsers.findAll({
      where: { user_id: userId },
    });
    const skillIds = userSkills.map((skill) => skill.skill_id);
    const skills = await Skills.findAll({ where: { id: skillIds } });
    const skillsWithDetails = userSkills.map((activity) => {
      const skill = skills.find((skill) => skill.id === activity.skill_id);
      return skill;
    });
    const userOrganizer = await VolunteerRequest.findOne({
      where: { user_id: userId },
    });

    const userActivity = await ActivityApply.findAll({
      where: { user_id: userId },
    });
    const activityMapper = await activityApplyMapper(userActivity);
    const response: GeneralResponse<{
      user: UserAttributes;
      skills: any[];
      activityApplied: any[];
      belongsOrganizer: VolunteerRequestAttributes | null;
    }> = {
      status: 200,
      data: {
        user: user.toJSON() as UserAttributes,
        skills: skillsWithDetails,
        activityApplied: activityMapper,
        belongsOrganizer: userOrganizer,
      },
      message: 'Lấy thông tin người dùng thành công',
    };
    commonResponse(req, res, response);
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
