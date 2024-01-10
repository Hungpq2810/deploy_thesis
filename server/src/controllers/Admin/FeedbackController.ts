import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { Feedback, FeedbackAttributes } from '../../models/feedback';
import { feedbackMapper } from '../../mapper/FeedbackMapper';
dotenv.config();

export const listFeedBack = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const feedbacksCurrent = await Feedback.findAll({
      where: { activity_id: 0 },
    });
    const feedbacks = await feedbackMapper(feedbacksCurrent);
    if (feedbacks.length > 0) {
      const response: GeneralResponse<{
        feedbacks: any;
      }> = {
        status: 200,
        data: { feedbacks },
        message: 'Lấy danh sách phản hồi thành công',
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: 'Chưa có phản hồi hệ thống',
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
