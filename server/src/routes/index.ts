// server/src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public route for authentication
router.use('/auth', authRoutes);

// Protected API routes - Apply the authentication middleware
router.use('/api', authenticateToken, apiRoutes);

export default router;
