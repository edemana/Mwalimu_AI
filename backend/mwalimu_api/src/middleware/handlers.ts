import { Handler } from "express"; // Import the Handler type from express for type safety
import { validationResult } from "express-validator"; // Import validationResult to handle validation results
import { logger } from "../logging"; // Import logger for logging errors and debugging information
import { prettyPrint } from ".."; // Import prettyPrint for formatted error output

// Middleware to handle user validation errors
export const handleUserValidation: Handler = (req, res, next) => {
    // Get validation errors from the request
    const errors = validationResult(req);
    // Check if there are any validation errors
    if (!errors.isEmpty()) {
        // Send a response with a 400 status code and the errors array
        return res.status(400).send({ msg: errors.array() });
    }
    // If no errors, pass control to the next middleware or route handler
    next();
};

// Middleware to handle general validation errors
export const handleValidation: Handler = (req, res, next) => {
    // Get validation errors from the request
    const errors = validationResult(req);
    // Check if there are any validation errors
    if (!errors.isEmpty()) {
        // Log the error message with error level
        logger.error("Missing required items in body");
        // Log detailed debug information about the errors
        logger.debug(prettyPrint(errors));
        // Send a response with a 400 status code and a general error message
        return res.status(400).send({ msg: "Missing required items in body" });
    }
    // If no errors, pass control to the next middleware or route handler
    next();
};
