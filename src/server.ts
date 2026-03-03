import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

// 1. Connect to Database
connectDB();

// 2. Set Port
const PORT = process.env.PORT || 5000;

// 3. Start the Server
const server = app.listen(PORT, () => {
    console.log(`BuyBee Backend running on PORT: ${PORT}`);
});

// 4. Handle Server-level errors (Standard corporate practice)
process.on("unhandledRejection", (err: any) => {
    console.log(`Critical Error: ${err.message}`);
    server.close(() => process.exit(1));
});