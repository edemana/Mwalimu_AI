import { Handler } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { logger } from "../logging";
import { prettyPrint } from "..";
import { body } from "express-validator";

export const validateUserInfo = () => {
    return [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Invalid Email")
            .exists(),
        body("password")
            .isLength({ min: 7 })
            .withMessage("Password must be at least 5 characters long")
            .isLength({ max: 30 })
            .withMessage("Password must not be longer than 30 characters")
            .matches(/\d/)
            .withMessage("Password must contain at least one number")
            .matches(/\W/)
            .withMessage(
                "Password must contain at lease one special character, i.e !@#&$",
            )
            .exists(),
    ];
};

export const validateJWT: Handler = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        logger.error("No access token found in request");
        return res
            .status(417)
            .send({ msg: "No access token found in request" });
    }

    try {
        verify(token.split(" ")[1], process.env.SECRET_KEY!);
        next();
    } catch (err) {
        if (err instanceof JsonWebTokenError) {
            logger.error(`Validate JWT: ${err.message}`);
            logger.error(`token: ${prettyPrint(token)}`);
            return res.status(401).send({ msg: err.message });
        }
    }
};
