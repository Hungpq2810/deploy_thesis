import { Request, Response } from 'express';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { FAQ, FAQAttributes } from '../models/faq';
export const listFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const faqs = await FAQ.findAll();
    const response: GeneralResponse<{
      faqs: FAQAttributes[];
    }> = {
      status: 200,
      data: { faqs },
      message: 'Lấy danh sách faq thành công',
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

export const getFaqById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByPk(id);
    if (faq) {
      const response: GeneralResponse<any> = {
        status: 200,
        data: faq.toJSON(),
        message: 'Get FAQ by ID successfully',
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 404,
        data: null,
        message: 'FAQ not found',
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
