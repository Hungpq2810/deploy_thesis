import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { Users } from '../models/users';
import { VolunteerRequest } from '../models/volunteer_request';
import { EmailDetails, EmailUtils } from '../utilities/EmailUtils';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const requestVolunteer = async (
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
    if (user) {
      if (user.organization_id && user.role_id === 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: 'Bạn đã là tổ chức',
        };
        commonResponse(req, res, response);
      } else {
        const checkRequestTime = await VolunteerRequest.findAll({
          where: {
            user_id: userId,
            status: 1,
          },
        });
        if (checkRequestTime.length > 0) {
          const response: GeneralResponse<{}> = {
            status: 400,
            data: null,
            message: 'Bạn đã yêu cầu trở thành tổ chức',
          };
          commonResponse(req, res, response);
        } else {
          const body = {
            user_id: Number(userId) as number,
            organization_id: Number(req.body.organization_id) as number,
            status: 1,
            created_at: new Date(),
            updated_at: new Date(),
          };
          const result = await VolunteerRequest.create(body);
          if (result) {
            const emailUtils = new EmailUtils();
            const receiverEmail = user.email as string;
            const emailDetails: EmailDetails = {
              subject: 'Volunteer Request Confirmation',
              body: 'Your volunteer request has been successfully submitted.',
            };
            emailUtils.sendEmail(receiverEmail, emailDetails);
            const response: GeneralResponse<{}> = {
              status: 200,
              data: null,
              message: 'Request successfull',
            };
            commonResponse(req, res, response);
          }
        }
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

export const cancelRequestVolunteer = async (
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
    if (user) {
      if (user.organization_id && user.role_id === 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: 'Bạn đã là tổ chức',
        };
        commonResponse(req, res, response);
      } else {
        const checkRequestTime = await VolunteerRequest.findAll({
          where: {
            user_id: userId,
            status: 1,
          },
        });
        if (checkRequestTime.length > 0) {
          await VolunteerRequest.destroy({
            where: { user_id: userId },
          });
        }
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Hủy đăng ký thành công',
        };
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
