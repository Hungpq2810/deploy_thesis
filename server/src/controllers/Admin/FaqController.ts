import { Request, Response } from 'express';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { FAQ } from '../../models/faq';

export const createFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = {
      question: req.body.question,
      answer: req.body.answer,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await FAQ.create(body);
    if (result) {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: null,
        message: 'Tạo FAQ thành công',
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
export const updateFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      res.status(404).json({ message: 'Không tìm thấy FAQ' });
      return;
    }

    const updatedFields = {
      question: req.body.question,
      answer: req.body.answer,
      updated_at: new Date(),
    };

    await faq.update(updatedFields);

    const response: GeneralResponse<{}> = {
      status: 200,
      data: null,
      message: 'Cập nhật FAQ thành công',
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
export const deleteFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByPk(id);
    if (!faq) {
      res.status(404).json({ message: 'Không tìm thấy FAQ' });
      return;
    }

    await faq.destroy();

    const response: GeneralResponse<{}> = {
      status: 200,
      data: null,
      message: 'Xóa FAQ thành công',
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
