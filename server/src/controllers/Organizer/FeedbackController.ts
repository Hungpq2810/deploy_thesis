import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { Feedback, FeedbackAttributes } from '../../models/feedback';
import { Users } from '../../models/users';
import { Activities } from '../../models/activities';
import { feedbackMapper } from '../../mapper/FeedbackMapper';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const listFeedBackByOrganizer = async (
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
    const organizer = await Users.findOne({
      where: { id: organizerId, role_id: 2 },
    });
    if (organizer) {
      const activities = await Activities.findAll({
        where: { creator: organizerId },
      });
      const activityIds = activities.map((activity) => activity.id);
      const feedbacksCurrent = await Feedback.findAll({
        where: { activity_id: activityIds },
      });
      const feedbacks = await feedbackMapper(feedbacksCurrent); // Sử dụng hàm mapper
      if (feedbacks.length > 0) {
        const response: GeneralResponse<any> = {
          status: 200,
          data: { feedbacks },
          message: 'Lấy danh sách phản hồi thành công',
        };
        commonResponse(req, res, response);
      } else {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: [],
          message: 'Không có phản hồi nào',
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
