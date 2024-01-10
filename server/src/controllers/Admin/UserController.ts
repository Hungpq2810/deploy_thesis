import { Request, Response } from 'express';
import { Op } from 'sequelize';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { UserAttributes, Users } from '../../models/users';
dotenv.config();

export const listUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Users.findAll({
      where: {
        role_id: {
          [Op.not]: 3,
        },
        status: 0,
      },
      attributes: { exclude: ['password'] },
    });

    const response: GeneralResponse<{
      users: UserAttributes[];
    }> = {
      status: 200,
      data: { users },
      message: 'Lấy danh sách user thành công',
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

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const user = await Users.findByPk(userId, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      const response: GeneralResponse<{}> = {
        status: 404,
        data: null,
        message: 'Không tìm thấy user',
      };
      commonResponse(req, res, response);
      return;
    }

    const response: GeneralResponse<UserAttributes> = {
      status: 200,
      data: user,
      message: 'Tìm người dùng theo id thành công',
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

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Không tìm thấy người dùng',
      };
      commonResponse(req, res, response);
      return;
    } else {
      const body = req.body;
      const result = await user.update(body);
      const response: GeneralResponse<UserAttributes> = {
        status: 200,
        data: result.toJSON() as UserAttributes,
        message: 'Cập nhật người dùng thành công',
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
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (user) {
      const body = {
        status: 1,
      };
      user.update(body);
    } else {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Không tìm thấy người dùng',
      };
      commonResponse(req, res, response);
      return;
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
