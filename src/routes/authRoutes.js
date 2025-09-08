import express from 'express';
import { loginUser } from '../services/authService.js';

const router = express.Router();

// POST /login
router.post('/', loginUser);

export default router;
