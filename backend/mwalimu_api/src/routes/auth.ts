import { logger } from "../logging";
import crypto from "crypto";
import { sign } from "jsonwebtoken";

import { validateJWT, validateUserInfo } from "../middleware/validators";
import express, { NextFunction, Request, Response } from "express";
import { prettyPrint } from "../";
import UserService from "../services/UserService";
import { CustomRequest, LoginRequest, UserInfo } from "../types";
import { handleUserValidation } from "../middleware/handlers";

const auth = express.Router();

auth.get("/info", (_req, res) => {
    //#summary = 'Auth info'
    /*
    #swagger.tags = ['Auth']
    #swagger.responses[500] = { description: 'Server Error'}
    */

    res.send("Auth route");
});

auth.delete(
    "/delete/:id",
    validateJWT,
    (req: CustomRequest<{ id: string }, { userId: string }>, res) => {
        const { id } = req.params;

        logger.info(`Delete user with id ${id}`);
        if (!id) {
            return res.status(400).send({ msg: "Missing required fields" });
        }

        UserService.Delete(id)
            .then(({ status, data }) => {
                return res.status(status).send(data);
            })
            .catch((err) => {
                logger.error(`Delete User: ${err}`);
                return res.status(500).send({ msg: "Server Error" });
            });
    },
);

auth.use(validateUserInfo(), handleUserValidation);

auth.post("/signup", (req: CustomRequest<unknown, UserInfo>, res) => {
    /*
    #swagger.summary = 'Sign up'
     #swagger.parameters['userInfo'] = { in: 'body', description: 'User info', required: true, schema: { $ref: "#/definitions/UserInfo" } }
    #swagger.responses[200] = { description: 'User successfully signed up' }
    #swagger.responses[400] = { description: 'Email is already registered'}
    */
    const { email, password } = req.body;

    const userInfo: UserInfo = {
        email: email,
        password: password,
    };
    logger.debug(prettyPrint(userInfo));

    UserService.SignUp(userInfo)
        .then(({ status, data }) => {
            return res.status(status).send(data);
        })
        .catch((err) => {
            logger.error(`Signup: ${err}`);
            return res.status(500).send({ msg: "Server Error" });
        });
});

auth.post("/login", (req: CustomRequest<unknown, LoginRequest>, res) => {
    /*
    #swagger.summary = 'Login'
    #swagger.parameters['userInfo'] = { in: 'body', description: 'User info', required: true, schema: { $ref: "#/definitions/UserInfo" } }
    #swagger.responses[200] = { description: 'User successfully logged in',  schema: { $userDetails: { $ref: "#/definitions/UserInfo" } } }
    #swagger.responses[401] = { description: 'Incorrect Password'}
    */
    const { email, password } = req.body;
    const userInfo: UserInfo = {
        email: email,
        password: password,
    };
    logger.debug(prettyPrint(userInfo));
    UserService.Login(userInfo, (userId) => {
        const SECRET_KEY = process.env.SECRET_KEY!;
        const refreshId = userId + SECRET_KEY;
        const salt = crypto.randomBytes(16).toString("base64");
        const hash = crypto
            .createHmac("sha512", salt)
            .update(refreshId)
            .digest("base64");
        req.body.refreshKey = salt;
        const token = sign(req.body, SECRET_KEY, {
            expiresIn: "3h",
        });
        const b = Buffer.from(hash);
        const refreshToken = b.toString("base64");
        return { accessToken: token, refreshToken: refreshToken };
    })
        .then(({ status, data }) => {
            return res.status(status).send(data);
        })
        .catch((err) => {
            logger.error(`Login: ${err}`);
            return res.status(500).send({ msg: "Server Error" });
        });
});

export default auth;
