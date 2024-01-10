import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { Users } from '../models/users';
import { Feedback } from '../models/feedback';
import { feedbackMapper } from '../mapper/FeedbackMapper';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const newFeedBack = async (
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
    } else if (req.body.activity_id) {
      const body = {
        user_id: userId,
        activity_id: req.body.activity_id as number,
        title: req.body.title as string,
        content: req.body.content as string,
        rate: req.body.rate as number,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const result = await Feedback.create(body);
      if (result) {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Gửi phản hồi thành công',
        };
        commonResponse(req, res, response);
      }
    } else {
      const body = {
        user_id: userId,
        activity_id: NaN,
        title: req.body.title as string,
        content: req.body.content as string,
        rate: req.body.rate as number,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const result = await Feedback.create(body);
      if (result) {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Gửi phản hồi thành công',
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

export const listFeedBackNoAuth = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const feedbacksCurrent = await Feedback.findAll({
      where: { activity_id: 0 },
    });
    const feedbacks = await feedbackMapper(feedbacksCurrent); // Sử dụng hàm mapper
    if (feedbacks.length > 0) {
      const response: GeneralResponse<{
        feedbacks: any;
      }> = {
        status: 200,
        data: { feedbacks },
        message: 'Get list feedback successfully',
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: 'Get list feedback successfully',
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
