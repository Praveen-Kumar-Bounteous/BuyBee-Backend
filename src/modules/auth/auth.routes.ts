//auth.routes.ts

import { Router } from 'express';
import { AuthController } from './auth.controller.js';

const router = Router();

// Create user (accepts role: 'seller' or 'buyer' in body)
router.post('/register', AuthController.register);

// Login (returns AT and sets RT cookie)
router.post('/login', AuthController.login);

// Logout (removes RT from DB)
router.post('/logout', AuthController.logout);

export default router;