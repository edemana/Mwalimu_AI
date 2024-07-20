import { compare, genSalt, hash } from "bcrypt";
import {
    NewUser,
    User,
    deleteUser,
    getUser,
    getUserById,
    insertUser,
    updateUser,
} from "../db/schema/user";
import { logger } from "../logging";
import { UserInfo, ServiceReturn } from "../types";
import { ROUNDS } from "../constants";
import { prettyPrint } from "..";
import { resolveError } from "../utils/catchError";

class UserService {
    async Login(
        userInfo: UserInfo,
        generateTokens: (userId: string) => {
            accessToken: string;
            refreshToken: string;
        },
    ): Promise<ServiceReturn> {
        const { email, password } = userInfo;
        try {
            const users = await getUser(email);

            if (users.length == 0) {
                logger.info(`User: ${email} not found`);
                return { status: 404, data: { msg: "User not found" } };
            }

            logger.info(`User: ${email} found`);

            const { passhash, userId } = users[0];
            const compareResult = await compare(password, passhash);
            if (compareResult) {
                const { accessToken, refreshToken } = generateTokens(userId);

                const userDetails = {
                    id: userId,
                    email: email,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                logger.debug(prettyPrint(userDetails));
                return { status: 200, data: { userDetails } };
            } else {
                logger.info(`Incorrect password: ${email}`);
                return { status: 401, data: { msg: "Incorrect Password" } };
            }
        } catch (error) {
            const err = resolveError(error);
            logger.error(`/auth/login Error: ${err.stack}`);
            return { status: 500, data: { msg: err.message } };
        }
    }

    async SignUp(userInfo: UserInfo): Promise<ServiceReturn> {
        const { email, password } = userInfo;
        try {
            const users = await getUser(email);

            if (users.length !== 0) {
                logger.info(`User: ${email} already registered`);
                return {
                    status: 400,
                    data: { msg: "Email is already registered" },
                };
            }

            const salt = await genSalt(ROUNDS);
            const user: NewUser = {
                email: email,
                salt: salt,
                passhash: await hash(password, salt),
            };

            try {
                const result = await insertUser(user);
                const { userId } = result[0];

                logger.info(`User: ${email} successfully registered`);
                logger.debug(prettyPrint(result));

                // logger.info(`Creating starting categories for user ${email}`);
                // const startingCategories = STARTING_CATEGORIES.map(
                //     (category) => ({ ...category, userId: userId }),
                // );
                // logger.info(
                //     `Adding categories to user ${email}\n${prettyPrint(
                //         startingCategories,
                //     )}`,
                // );
                // startingCategories.forEach(
                //     // eslint-disable-next-line @typescript-eslint/no-misused-promises
                //     async (category) => await insertCategory(category),
                // );

                return {
                    status: 200,
                    data: { msg: "User inserted successfully" },
                };
            } catch (error) {
                const err = resolveError(error);
                return { status: 500, data: { msg: err.message } };
            }
        } catch (error) {
            const err = resolveError(error);
            logger.error(`/auth/signup Error: ${err.stack}`);
            return { status: 500, data: { msg: err.message } };
        }
    }

    async Delete(userId: string): Promise<ServiceReturn> {
        try {
            const user = await getUserById(userId);
            if (user.length === 0) {
                return {
                    status: 400,
                    data: {
                        msg: "User not found. Cannot delete a user that doesn't exist",
                    },
                };
            }

            logger.info(`Deleting user with id ${userId}`);
            const res = await deleteUser(userId);
            logger.debug(prettyPrint(res));

            return {
                status: 200,
                data: { msg: "User deleted successfully" },
            };
        } catch (error) {
            const err = resolveError(error);
            logger.error(`/auth/delete Error: ${err.stack}`);
            return {
                status: 500,
                data: { msg: "Something went wrong while deleting user" },
            };
        }
    }

    async Update(user: UserInfo): Promise<ServiceReturn> {
        const { userId } = user;
        try {
            const result = await updateUser(userId!, {
                ...user,
            });

            logger.info(`User: ${userId} successfully updated`);
            logger.debug(prettyPrint(result));
            return {
                status: 200,
                data: { msg: "User updated successfully" },
            };
        } catch (error) {
            const err = resolveError(error);
            logger.info(`/auth/update Error: ${err.stack}`);
            return { status: 500, data: { msg: err.message } };
        }
    }
}

export default new UserService();
