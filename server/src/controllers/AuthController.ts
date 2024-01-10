import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserAttributes, Users } from '../models/users';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
const secretKey = process.env.SECRETKEY as string;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const account = await Users.findOne({
      where: {
        username,
        status: 0,
      },
    });

    if (account) {
      // const isPasswordValid = await bcrypt.compare(password, account.password);
      const isPasswordValid = true;
      if (isPasswordValid) {
        const user = account.toJSON();
        const objectToken = {
        id: user.id,
        username: user.username,
        role_id: user.role_id,
        email: user.email,
      };
      const token = jwt.sign(objectToken, secretKey);
        const response: GeneralResponse<{ token: string }> = {
          status: 200,
          data: { token },
          message: 'Success: User logged in successfully!',
        };
        commonResponse(req, res, response);
      } else {
        const response = {
          status: 401,
          data: null,
          message: 'Invalid username or password',
        };
        commonResponse(req, res, response);
      }
    } else {
      const response: GeneralResponse<null> = {
        status: 401,
        message: 'Invalid username or password',
      };
      commonResponse(req, res, response);
    }
  } catch (error) {
    console.error(error);
    const response: GeneralResponse<null> = {
      status: 500,
      message: 'Internal server error',
    };
    commonResponse(req, res, response);
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      password,
      name,
      email,
      phone,
      gender,
      birthday,
      address,
    } = req.body;
    const existingAccount = await Users.findOne({
      where: { username },
    });
    if (existingAccount) {
      res.status(400).json({ message: 'Account already exists!' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Thay đổi số vòng lặp nếu cần
    const user = await Users.create({
      username,
      password: hashedPassword,
      role_id: 1,
      organization_id: null,
      name,
      email,
      phone,
      gender,
      birthday,
      address,
      avatar: '',
      status: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
    if (user) {
      const response: GeneralResponse<{
        user: UserAttributes;
      }> = {
        status: 200,
        data: { user },
        message: 'Success: Register in successfully!',
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<null> = {
        status: 401,
        message: 'Invalid something or email exits',
      };
      commonResponse(req, res, response);
    }
  } catch (error) {
    console.error(error);
    const response: GeneralResponse<null> = {
      status: 500,
      message: 'Internal server error',
    };
    commonResponse(req, res, response);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, passwordOld, passwordNew } = req.body;

    if (!passwordOld || !passwordNew) {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Password field is required!',
      };
      commonResponse(req, res, response);
      return;
    }
    try {
      const user = await Users.findOne({
        where: { email: email, status: 0 },
      });
      if (user) {
        const checkPassword = await Users.findOne({
          where: { password: passwordOld },
        });
        if (checkPassword) {
          user.password = passwordNew;
          await user.save();
        } else {
          throw new Error('Password old not correct');
        }
      } else {
        throw new Error('Account not found');
      }
    } catch (error) {
      throw new Error('Unable to update password');
    }
    const response: GeneralResponse<{}> = {
      status: 200,
      data: null,
      message: 'Password updated successfully!',
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

// export const forget = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email } = req.body;

//     let tempCustomer;
//     let tempUser;
//     let accountId: number | null = null;

//     // Tìm khách hàng và người dùng thông qua email
//     tempCustomer = await Customer.findOne({ where: { email } });
//     tempUser = await User.findOne({ where: { email } });

//     if (tempCustomer || tempUser) {
//       if (tempCustomer && tempUser) {
//         res
//           .status(400)
//           .json({ message: "User somehow has 2 different profiles." });
//         return;
//       }

//       accountId = tempCustomer
//         ? tempCustomer.account_id
//         : tempUser
//         ? tempUser.account_id
//         : null;

//       if (accountId === null) {
//         res.status(404).json({ message: "Could not find the given account." });
//         return;
//       }

//       // Tạo mã xác minh
//       const verificationCode = Constant.generateRandomString(10);
//       //Todo
//       // await Account.addForgetCode(accountId, verificationCode);
//       // Save không cần thiết nếu đã sử dụng hàm addForgetCode mà không cần lưu lại

//       // Gửi email
//       const emailUtil = new EmailUtils(); // Chắc chắn rằng bạn đã tạo class EmailUtils và EmailDetails
//       const details: EmailDetails = {
//         subject: "Forget Password",
//         body: `Your verification code is: ${verificationCode}\nPlease don't share it with anyone else.`,
//       };
//       emailUtil.sendEmail(email, details); // Chắc chắn rằng bạn đã có thông tin cấu hình email

//       res.json({ accountId });
//       return;
//     }

//     res.status(404).json({ message: "Could not find the given account." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
