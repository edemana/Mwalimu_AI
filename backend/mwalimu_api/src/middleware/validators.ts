import { Handler } from "express"; // Import the Handler type from express for type safety
import { JsonWebTokenError, verify } from "jsonwebtoken"; // Import JsonWebTokenError and verify for JWT handling
import { logger } from "../logging"; // Import logger for logging errors and debugging information
import { prettyPrint } from ".."; // Import prettyPrint for formatted output of JWT and errors
import { body } from "express-validator"; // Import body from express-validator for request validation

// Middleware to validate user information
export const validateUserInfo = () => {
    return [
        // Validate email field
        body("email")
            .isEmail() // Check if the email is valid
            .normalizeEmail() // Normalize the email (e.g., lowercase)
            .withMessage("Invalid Email") // Custom error message if email validation fails
            .exists(), // Ensure the email field exists in the request body

        // Validate password field
        body("password")
            .isLength({ min: 7 }) // Check if the password length is at least 7 characters
            .withMessage("Password must be at least 7 characters long") // Custom error message
            .isLength({ max: 30 }) // Check if the password length does not exceed 30 characters
            .withMessage("Password must not be longer than 30 characters") // Custom error message
            .matches(/\d/) // Check if the password contains at least one digit
            .withMessage("Password must contain at least one number") // Custom error message
            .matches(/\W/) // Check if the password contains at least one special character
            .withMessage(
                "Password must contain at least one special character, i.e !@#&$",
            ) // Custom error message
            .exists(), // Ensure the password field exists in the request body
    ];
};

// Middleware to validate JSON Web Token (JWT)
export const validateJWT: Handler = (req, res, next) => {
    // Retrieve the token from the authorization header
    const token = req.headers["authorization"];
    
    // If no token is found in the request headers
    if (!token) {
        logger.error("No access token found in request"); // Log error
        return res
            .status(417) // HTTP status code for expectation failed
            .send({ msg: "No access token found in request" }); // Send response with error message
    }

    try {
        // Verify the token using the secret key from environment variables
        verify(token.split(" ")[1], process.env.SECRET_KEY!);
        next(); // If token is valid, pass control to the next middleware or route handler
    } catch (err) {
        // Handle JWT errors
        if (err instanceof JsonWebTokenError) {
            logger.error(`Validate JWT: ${err.message}`); // Log JWT error message
            logger.error(`token: ${prettyPrint(token)}`); // Log the token (formatted)
            return res.status(401).send({ msg: err.message }); // Send response with error message
        }
    }
};
