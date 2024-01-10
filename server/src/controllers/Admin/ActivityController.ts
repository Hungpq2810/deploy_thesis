import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { Activities } from '../../models/activities';
dotenv.config();

export const deleteActivityByAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const activityId = req.params.id;
    const activity = await Activities.findByPk(activityId);

    if (activity) {
      await Activities.destroy({
        where: { id: activityId },
      });

      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: 'Xóa sự kiện thành công',
      };
      commonResponse(req, res, response);
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (error) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: 'Gặp lỗi khi xóa sự kiện',
    };
    commonResponse(req, res, response);
  }
};
