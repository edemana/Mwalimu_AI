import { compare, genSalt, hash } from "bcrypt"; // Import bcrypt functions for password hashing and comparison
import {
    NewUser,
    User,
    deleteUser,
    getUser,
    getUserById,
    insertUser,
    updateUser,
} from "../db/schema/user"; // Import user-related database operations and types
import { logger } from "../logging"; // Import logger for logging messages
import { UserInfo, ServiceReturn } from "../types"; // Import types for user information and service return
import { ROUNDS } from "../constants"; // Import constants such as the number of salt rounds
import { prettyPrint } from ".."; // Import prettyPrint for formatted output
import { resolveError } from "../utils/catchError"; // Import resolveError utility for error handling

class UserService {
    // Method to handle user login
    async Login(
        userInfo: UserInfo,
        generateTokens: (userId: string) => {
            accessToken: string;
            refreshToken: string;
        },
    ): Promise<ServiceReturn> {
        const { email, password } = userInfo;
        try {
            // Fetch user details by email
            const users = await getUser(email);

            // Check if the user exists
            if (users.length == 0) {
                logger.info(`User: ${email} not found`);
                return { status: 404, data: { msg: "User not found" } };
            }

            logger.info(`User: ${email} found`);

            const { passhash, userId, level } = users[0]; // Extract password hash and user ID
            // Compare provided password with the stored hash
            const compareResult = await compare(password, passhash);
            if (compareResult) {
                // Generate tokens if the password matches
                const { accessToken, refreshToken } = generateTokens(userId);

                const userDetails = {
                    id: userId,
                    email: email,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    level: level,
                };
                logger.debug(prettyPrint(userDetails)); // Log user details
                return { status: 200, data: { userDetails } }; // Return successful response with user details
            } else {
                logger.info(`Incorrect password: ${email}`);
                return { status: 401, data: { msg: "Incorrect Password" } }; // Return unauthorized response
            }
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`/auth/login Error: ${err.stack}`); // Log the error
            return { status: 500, data: { msg: err.message } }; // Return server error response
        }
    }

    // Method to handle user sign up
    async SignUp(userInfo: UserInfo): Promise<ServiceReturn> {
        const { email, password, level } = userInfo;
        try {
            // Check if the user already exists
            const users = await getUser(email);

            if (users.length !== 0) {
                logger.info(`User: ${email} already registered`);
                return {
                    status: 400,
                    data: { msg: "Email is already registered" }, // Return bad request response
                };
            }

            // Generate salt and hash the password
            const salt = await genSalt(ROUNDS);
            const user: NewUser = {
                email: email,
                salt: salt,
                passhash: await hash(password, salt),
                level: level,
            };

            try {
                // Insert the new user into the database
                const result = await insertUser(user);
                const { userId } = result[0];

                logger.info(`User: ${email} successfully registered`);
                logger.debug(prettyPrint(result)); // Log registration result

                return {
                    status: 200,
                    data: { msg: "User inserted successfully" }, // Return successful response
                };
            } catch (error) {
                const err = resolveError(error); // Handle and format the error
                return { status: 500, data: { msg: err.message } }; // Return server error response
            }
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`/auth/signup Error: ${err.stack}`); // Log the error
            return { status: 500, data: { msg: err.message } }; // Return server error response
        }
    }

    // Method to delete a user by ID
    async Delete(userId: string): Promise<ServiceReturn> {
        try {
            // Fetch user details by ID
            const user = await getUserById(userId);
            if (user.length === 0) {
                return {
                    status: 400,
                    data: {
                        msg: "User not found. Cannot delete a user that doesn't exist", // Return bad request response
                    },
                };
            }

            logger.info(`Deleting user with id ${userId}`);
            const res = await deleteUser(userId); // Delete user from the database
            logger.debug(prettyPrint(res)); // Log deletion result

            return {
                status: 200,
                data: { msg: "User deleted successfully" }, // Return successful response
            };
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`/auth/delete Error: ${err.stack}`); // Log the error
            return {
                status: 500,
                data: { msg: "Something went wrong while deleting user" }, // Return server error response
            };
        }
    }

    // Method to update user information
    async Update(user: UserInfo): Promise<ServiceReturn> {
        const { userId } = user;
        try {
            // Update user details in the database
            const result = await updateUser(userId!, {
                ...user,
            });

            logger.info(`User: ${userId} successfully updated`);
            logger.debug(prettyPrint(result)); // Log update result
            return {
                status: 200,
                data: { msg: "User updated successfully" }, // Return successful response
            };
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.info(`/auth/update Error: ${err.stack}`); // Log the error
            return { status: 500, data: { msg: err.message } }; // Return server error response
        }
    }
}

export default new UserService(); // Export an instance of UserService for use in other parts of the application
