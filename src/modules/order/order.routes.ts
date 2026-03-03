// Routes for placing orders and viewing history.

import { Router } from 'express';
import { OrderController } from './order.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

// Only logged-in Buyers can interact with orders
router.use(authenticate, authorize(['buyer']));

router.post('/checkout', OrderController.checkout);
router.get('/history', OrderController.getHistory);

export default router;