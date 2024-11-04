import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  username: string;
  // Add other properties if needed, e.g., user ID or roles
}

// Extend the Request interface to include the `user` property
declare module 'express-serve-static-core' {
  interface Request {
    user?: CustomJwtPayload;
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>' format

  if (!token) {
    res.status(401).json({ message: 'No token provided. Access denied.' });
    return; // Ensure that this path returns explicitly
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err || !decoded) {
      res.status(403).json({ message: 'Token is invalid or expired.' });
      return; // Explicitly return here to satisfy TypeScript's return type check
    }

    // Ensure `decoded` is cast safely to `CustomJwtPayload` if it is an object
    if (typeof decoded === 'object') {
      req.user = decoded as CustomJwtPayload;
    }

    next(); // Proceed to the next middleware or route handler
  });
};
