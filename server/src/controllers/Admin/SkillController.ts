import { Request, Response } from 'express';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { Skills } from '../../models/skills';

export const createSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const body = {
      name: req.body.name as string,
      description: req.body.description as string,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await Skills.create(body);
    if (result) {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: 'Tạo kỹ năng thành công',
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
export const updateSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const skillId = req.params.id;
    const body = {
      name: req.body.name as string,
      description: req.body.description as string,
      updated_at: new Date(),
    };
    const result = await Skills.update(body, {
      where: { id: skillId },
    });
    if (result) {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: 'Cập nhật kĩ năng thành công',
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

export const deleteSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const skillId = req.params.id;
    const result = await Skills.destroy({
      where: { id: skillId },
    });
    if (result) {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: 'Xóa kỹ năng thành công',
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
