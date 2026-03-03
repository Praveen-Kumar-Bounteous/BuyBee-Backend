import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import cartRoutes from "../modules/cart/cart.routes.js";
import orderRoutes from "../modules/order/order.routes.js";

const router = Router();

// Define API Version 1 Gateway
router.use("/auth", authRoutes);       // Login, Register, Logout
router.use("/products", productRoutes); // Create, Delete, View Products
router.use("/cart", cartRoutes);       // Add items, Clear cart
router.use("/orders", orderRoutes);     // Checkout, History

export default router;