// Protected routes strictly for the Buyer role.

import { Router } from 'express';
import { CartController } from './cart.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

// All cart routes require a logged-in Buyer
router.use(authenticate, authorize(['buyer']));

router.get('/', CartController.getCart);
router.post('/add', CartController.addItem);
router.delete('/clear', CartController.clear);

export default router;