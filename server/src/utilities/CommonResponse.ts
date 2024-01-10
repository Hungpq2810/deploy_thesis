import { Request, Response } from 'express';

export interface GeneralResponse<T> {
  status: number;
  data?: T | null;
  message?: string;
}

export const commonResponse = async (
  req: Request,
  res: Response,
  responseObject: GeneralResponse<any>,
): Promise<void> => {
  try {
    res.status(responseObject.status).json(responseObject);
  } catch (error) {
    console.error(error);
    const errorResponse: GeneralResponse<null> = {
      status: 500,
      message: 'Error: Internal server error!',
    };
    res.status(500).json(errorResponse);
  }
};
