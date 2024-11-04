import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; // Ensure this is the correct import for your model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Corrected query to use Sequelize's `where` clause
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Ensure `user.id` is used for Sequelize models (adjust if necessary)
    const token = jwt.sign(
      { username: user.username, id: user.id }, // Use `user.id` for Sequelize models
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'An error occurred during login.' });
  }
};

const router = Router();
router.post('/login', login);
export default router;
