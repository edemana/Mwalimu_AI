import winston from "winston"; // Import the winston logging library
import morgan from "morgan"; // Import the morgan HTTP request logger

const {
    combine,
    timestamp,
    printf,
    json,
    colorize,
    align,
    splat,
    errors,
    prettyPrint,
} = winston.format; // Extract various formatting options from winston

// Define log levels with corresponding numeric values
const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

// Define transports based on the environment
// Transports are where the logs are sent (e.g., console, file)
const transports =
    process.env.NODE_ENV === "production"
        ? [
              new winston.transports.File({ filename: "./logs/combined.log" }), // Log all messages to a file in production
              new winston.transports.Console(), // Also log to the console
          ]
        : [new winston.transports.Console()]; // Log only to the console in other environments

// Define exception handlers based on the environment
const exceptionHandlers =
    process.env.NODE_ENV === "production"
        ? [
              new winston.transports.File({
                  filename: "./logs/exceptions.log", // Log uncaught exceptions to a file in production
              }),
              new winston.transports.Console(), // Also log to the console
          ]
        : [new winston.transports.Console()]; // Log exceptions only to the console in other environments

// Define rejection handlers based on the environment
const rejectionHandlers =
    process.env.NODE_ENV === "production"
        ? [
              new winston.transports.File({
                  filename: "./logs/rejections.log", // Log unhandled promise rejections to a file in production
              }),
              new winston.transports.Console(), // Also log to the console
          ]
        : [new winston.transports.Console()]; // Log rejections only to the console in other environments

// Create a winston logger instance
const logger = winston.createLogger({
    levels: logLevels, // Set log levels
    level: process.env.LOG_LEVEL || "info", // Set default log level from environment variable or "info"
    format: combine(
        prettyPrint(), // Pretty-print the log output
        json(), // Output logs in JSON format
        errors({ stack: true }), // Include error stack traces in logs
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A", // Format timestamps
        }),
        align(), // Align log output
        colorize(), // Add color to log output based on log level
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`) // Custom log format
    ),
    transports: transports, // Set transports for logging
    exceptionHandlers: exceptionHandlers, // Set exception handlers
    rejectionHandlers: rejectionHandlers, // Set rejection handlers
});

// Create an HTTP logger using morgan
const httpLogger = morgan("short", {
    stream: { write: (message) => logger.info(message.trim()) } // Write HTTP logs using the winston logger
});

export { logger, httpLogger }; // Export the logger and HTTP logger
