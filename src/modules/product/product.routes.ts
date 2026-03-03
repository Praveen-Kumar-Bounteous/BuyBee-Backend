// src/modules/product/product.routes.ts

import { Router } from 'express';
import { ProductController } from './product.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/', ProductController.listAll);

// Seller only routes
router.post('/', authenticate, authorize(['seller']), ProductController.create);
router.patch('/:id', authenticate, authorize(['seller']), ProductController.update); // Added update
router.delete('/:id', authenticate, authorize(['seller']), ProductController.delete);

export default router;