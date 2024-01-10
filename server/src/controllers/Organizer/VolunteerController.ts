import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { Users } from '../../models/users';
import { VolunteerRequest } from '../../models/volunteer_request';
import { volunteerRequestMapper } from '../../mapper/VolunteerRequestMapper';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const getVolunteer = async (
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
    const organizer = await Users.findByPk(userId);
    
    if (organizer) {
      if (!organizer.organization_id && organizer.role_id !== 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: "Have an organization or you're an organization",
        };
        commonResponse(req, res, response);
      } else {
        const volunteers = await Users.findAll({
          where: {
            organization_id: organizer.organization_id,
            role_id: 1,
            status: 0,
          },
        });
        // const volunteerRequestMapped = await volunteerRequestMapper(
        //   volunteerRequest
        // );
        const response: GeneralResponse<{}> = {
          status: 200,
          data: volunteers,
          message: "Lấy danh sách thành công",
        };
        commonResponse(req, res, response);
      }
    }
    }
  catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};

export const removeVolunteer = async (
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
    const organizerId = decodedToken.id;
    const organizer = await Users.findByPk(organizerId);
    if (organizer) {
      if (!organizer.organization_id && organizer.role_id !== 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: "Have an organization or you're an organization",
        };
        commonResponse(req, res, response);
      } else {
        const { id } = req.params;
        const volunteer = await Users.findOne({
          where: { id: id, organization_id: organizer.organization_id },
        });
        
        if (volunteer) {
          await volunteer.update({ organization_id: null });
        }
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Successfull',
        };
        commonResponse(req, res, response);
      }
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
