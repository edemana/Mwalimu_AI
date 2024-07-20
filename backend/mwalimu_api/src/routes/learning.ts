import { logger } from "../logging";
import crypto from "crypto";
import { sign } from "jsonwebtoken";

import { validateJWT, validateUserInfo } from "../middleware/validators";
import express, { NextFunction, Request, Response, Router } from "express";
import { prettyPrint } from "../";
import UserService from "../services/UserService";
import { CustomRequest, LoginRequest, UserInfo } from "../types";
import { handleUserValidation } from "../middleware/handlers";
import LearningService from "../services/LearningService";
import { NewLesson } from "src/db/schema/lesson";
import { Lesson } from "src/db/schema/lesson";

const learning = Router();

learning.get("/info", (_req, res) => {
    res.send("Learning path route");
});

learning.use(validateJWT);

learning.post(
    "/create",
    async (
        req: CustomRequest<unknown, { lessonPrompt: string; userId: string }>,
        res,
    ) => {
        const { lessonPrompt, userId } = req.body;

        logger.info(`Creating lesson with prompt ${lessonPrompt}`);
        LearningService.Create(lessonPrompt, userId)
            .then(({ status, data }) => {
                return res.status(status).send(data);
            })
            .catch((err) => {
                logger.error(`Create lesson: ${err}`);
                return res.status(500).send({ msg: "Server Error" });
            });
    },
);

learning.post(
    "/add",
    (
        req: CustomRequest<unknown, { lesson: NewLesson; userId: string }>,
        res,
    ) => {
        const { lesson, userId } = req.body;
        LearningService.Add(lesson, userId)
            .then(({ status, data }) => {
                return res.status(status).send(data);
            })
            .catch((err) => {
                logger.error(`Add lesson: ${err}`);
                return res.status(500).send({ msg: "Server Error" });
            });
    },
);

learning.get("/lessons/:id", (req, res) => {
    const { id } = req.params;

    LearningService.GetAll(id)
        .then(({ status, data }) => {
            return res.status(status).send(data);
        })
        .catch((err) => {
            logger.error(`Get lesson: ${err}`);
            return res.status(500).send({ msg: "Server Error" });
        });
});

learning.put(
    "/update/:id",
    (req: CustomRequest<unknown, { lesson: Partial<Lesson> }>, res) => {
        const { id } = req.params;
        const { lesson } = req.body;

        LearningService.Update(lesson, id)
            .then(({ status, data }) => {
                return res.status(status).send(data);
            })
            .catch((err) => {
                logger.error(`Update lesson: ${err}`);
                return res.status(500).send({ msg: "Server Error" });
            });
    },
);

learning.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    LearningService.Delete(id)
        .then(({ status, data }) => {
            return res.status(status).send(data);
        })
        .catch((err) => {
            logger.error(`Delete lesson: ${err}`);
            return res.status(500).send({ msg: "Server Error" });
        });
});

export default learning;
