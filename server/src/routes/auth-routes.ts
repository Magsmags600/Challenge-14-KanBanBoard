// server/src/routes/auth-routes.ts
import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, id: user.id }, // Adjust fields as necessary
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' } // Token expiration time
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login.' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
