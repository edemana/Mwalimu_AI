import { logger } from "../logging"; // Import logger for logging messages
import crypto from "crypto"; // Import crypto for creating secure tokens
import { sign } from "jsonwebtoken"; // Import sign from jsonwebtoken for creating JWTs

import { validateJWT, validateUserInfo } from "../middleware/validators"; // Import validation middleware
import express, { NextFunction, Request, Response } from "express"; // Import express and related types
import { prettyPrint } from "../"; // Import prettyPrint for formatted output
import UserService from "../services/UserService"; // Import UserService for user-related operations
import { CustomRequest, LoginRequest, UserInfo } from "../types"; // Import custom types
import { handleUserValidation } from "../middleware/handlers"; // Import validation handling middleware

const auth = express.Router(); // Create an express router instance for authentication routes

// Route to get basic auth info
auth.get("/info", (_req, res) => {
    //#summary = 'Auth info'
    /*
    #swagger.tags = ['Auth']
    #swagger.responses[500] = { description: 'Server Error'}
    */

    res.send("Auth route"); // Send a basic response indicating the auth route
});

// Route to delete a user by ID, requires JWT validation
auth.delete(
    "/delete/:id",
    validateJWT, // Validate JWT before proceeding
    (req: CustomRequest<{ id: string }, { userId: string }>, res) => {
        const { id } = req.params; // Extract user ID from route parameters

        logger.info(`Delete user with id ${id}`); // Log the delete operation
        if (!id) {
            return res.status(400).send({ msg: "Missing required fields" }); // Send error if ID is missing
        }

        UserService.Delete(id) // Call Delete method from UserService
            .then(({ status, data }) => {
                return res.status(status).send(data); // Send response with status and data
            })
            .catch((err) => {
                logger.error(`Delete User: ${err}`); // Log errors
                return res.status(500).send({ msg: "Server Error" }); // Send server error response
            });
    },
);

// Apply user validation middleware
auth.use(validateUserInfo(), handleUserValidation);

// Route to sign up a new user
auth.post("/signup", (req: CustomRequest<unknown, UserInfo>, res) => {
    /*
    #swagger.summary = 'Sign up'
     #swagger.parameters['userInfo'] = { in: 'body', description: 'User info', required: true, schema: { $ref: "#/definitions/UserInfo" } }
    #swagger.responses[200] = { description: 'User successfully signed up' }
    #swagger.responses[400] = { description: 'Email is already registered'}
    */
    const { email, password, level } = req.body; // Extract user info from request body

    const userInfo: UserInfo = {
        email: email,
        password: password,
        level: level,
    };
    logger.debug(prettyPrint(userInfo)); // Log user info for debugging

    UserService.SignUp(userInfo) // Call SignUp method from UserService
        .then(({ status, data }) => {
            return res.status(status).send(data); // Send response with status and data
        })
        .catch((err) => {
            logger.error(`Signup: ${err}`); // Log errors
            return res.status(500).send({ msg: "Server Error" }); // Send server error response
        });
});

// Route to log in a user and generate JWTs
auth.post("/login", (req: CustomRequest<unknown, LoginRequest>, res) => {
    /*
    #swagger.summary = 'Login'
    #swagger.parameters['userInfo'] = { in: 'body', description: 'User info', required: true, schema: { $ref: "#/definitions/UserInfo" } }
    #swagger.responses[200] = { description: 'User successfully logged in',  schema: { $userDetails: { $ref: "#/definitions/UserInfo" } } }
    #swagger.responses[401] = { description: 'Incorrect Password'}
    */
    const { email, password } = req.body; // Extract login info from request body
    const userInfo: UserInfo = {
        email: email,
        password: password,
    };
    logger.debug(prettyPrint(userInfo)); // Log user info for debugging

    UserService.Login(userInfo, (userId) => {
        // Call Login method from UserService
        const SECRET_KEY = process.env.SECRET_KEY!;
        const refreshId = userId + SECRET_KEY; // Create a refresh ID using user ID and secret key
        const salt = crypto.randomBytes(16).toString("base64"); // Generate a random salt
        const hash = crypto
            .createHmac("sha512", salt) // Create HMAC hash with salt
            .update(refreshId) // Update hash with refresh ID
            .digest("base64"); // Digest the hash to base64
        req.body.refreshKey = salt; // Add the salt to request body for later use
        req.body.uniqueClaim = new Date().getTime();
        const token = sign(req.body, SECRET_KEY, {
            // Generate JWT token
            expiresIn: "3h", // Token expires in 3 hours
        });
        const b = Buffer.from(hash); // Create a buffer from the hash
        const refreshToken = b.toString("base64"); // Encode the hash as a base64 string
        return { accessToken: token, refreshToken: refreshToken }; // Return tokens
    })
        .then(({ status, data }) => {
            return res.status(status).send(data); // Send response with status and data
        })
        .catch((err) => {
            logger.error(`Login: ${err}`); // Log errors
            return res.status(500).send({ msg: "Server Error" }); // Send server error response
        });
});

export default auth; // Export the router for use in other parts of the application
