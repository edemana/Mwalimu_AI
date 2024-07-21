import express, { NextFunction, Request, Response } from "express"; // Import necessary modules from Express
import cors from "cors"; // Import CORS middleware
import helmet from "helmet"; // Import Helmet middleware for security
import compression from "compression"; // Import compression middleware to gzip responses
import dotenv from "dotenv"; // Import dotenv to load environment variables

import { httpLogger, logger } from "./logging"; // Import logging utilities

import { HOST, PORT } from "./constants"; // Import constants for host and port

import auth from "./routes/auth"; // Import authentication routes
import learning from "./routes/learning"; // Import learning routes

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express application instance

// Middleware setup
app.use(compression()); // Compress responses to reduce payload size
app.use(cors()); // Enable Cross-Origin Resource Sharing
// CORS configuration for development environment (commented out)
// if (process.env.NODE_ENV !== "development") {
//     app.use(cors({}));
// } else {
//     app.use(cors({ credentials: true, origin: "http://localhost:10500" }));
// }
app.use(express.json()); // Parse JSON request bodies
app.use(httpLogger); // Log HTTP requests
app.use(helmet()); // Set various HTTP headers for security

// Utility function for pretty-printing JSON logs
export const prettyPrint = <T>(log: T) => {
    return JSON.stringify(log, undefined, 4);
};

// Error-handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send({ msg: "Server error!" }); // Send a 500 status response
});

// Root route for basic server info
app.get("/info", (_req, res, _next) => {
    res.send("Mwalimu AI API Server"); // Send a simple message
});

// Use routes for authentication and learning
app.use("/auth", auth); // Authentication routes
app.use("/learning", learning); // Learning routes

export default app; // Export the Express application instance

// Start the server unless in testing environment
if (process.env.NODE_ENV !== "testing") {
    (() => {
        app.listen(PORT, HOST, () => {
            console.log(`Mode: ${process.env.NODE_ENV}`); // Log the environment mode
            console.log(`Listening on http://${HOST}:${PORT}`); // Log the server address
        });
    })();
}
