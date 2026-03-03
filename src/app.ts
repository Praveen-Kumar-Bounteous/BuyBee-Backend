import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/index.js"; 
import type { Application } from "express";

const app: Application = express();

// --- Standard Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true 
}));

// --- Mount the Professional API Routes ---
// All your logic (Auth, Product, Cart, Order) is inside here
app.use("/api/v1", apiRoutes);

// 1. Root Route ("/")
// If someone accesses http://localhost:5000/ they see this welcome message
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ 
        message: "Welcome to BuyBee - Ecommerce",
        documentation: "/api/v1" 
    });
});

// 2. Health Check Route ("/status")
// Used by monitoring tools to ensure the server is responding
app.get("/status", (req: Request, res: Response) => {
    res.status(200).json({ 
        status: "Online", 
        version: "1.0.0",
        uptime: process.uptime() // Shows how long the server has been running
    });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ 
        success: false, 
        message: `Route ${req.originalUrl} not found` 
    });
});

export default app;