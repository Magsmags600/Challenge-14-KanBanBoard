// server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  id: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the 'Bearer' scheme

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid.' });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY as string;
    if (!secret) {
      console.error('JWT secret not defined in environment variables.');
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = decoded; // Attach user data to the request object

    next(); // Proceed to the next middleware or route handler
    return; // Ensure the function exits after calling `next()`
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Access token is invalid or expired.' });
  }
};
