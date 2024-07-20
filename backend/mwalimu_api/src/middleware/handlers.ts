import { Handler } from "express";
import { validationResult } from "express-validator";
import { logger } from "../logging";
import { prettyPrint } from "..";

export const handleUserValidation: Handler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ msg: errors.array() });
    }
    next();
};

export const handleValidation: Handler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error("Missing required items in body");
        logger.debug(prettyPrint(errors));
        return res.status(400).send({ msg: "Missing required items in body" });
    }
    next();
};
