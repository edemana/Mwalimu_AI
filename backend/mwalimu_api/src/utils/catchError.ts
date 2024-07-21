import { logger } from "../logging"; // Import the logger for logging error messages

/**
 * Resolves the provided error into a standard `Error` object.
 * If the error is already an instance of `Error`, it returns it.
 * Otherwise, it logs the error as an unknown type and returns a generic "Unknown error".
 *
 * @param error - The error to resolve, which could be of any type.
 * @returns - An `Error` object representing the resolved error.
 */
export const resolveError = (error: unknown): Error => {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
        return error; // Return the error as is
    }

    // Log the error if it is not an instance of Error
    logger.error(`Unknown error: ${error as string}`);
    
    // Return a generic error message
    return new Error("Unknown error");
};
