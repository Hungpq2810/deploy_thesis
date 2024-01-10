import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRETKEY as string;

interface JWTPayload {
  userId: string;
  role: string;
}
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded as JWTPayload;
    next();
  });
};

export const generateToken = (userId: string, role: string): string => {
  const payload: JWTPayload = {
    userId: userId,
    role: role, // Thêm role vào payload
  };
  return jwt.sign(payload, secretKey, { expiresIn: '10h' });
};
