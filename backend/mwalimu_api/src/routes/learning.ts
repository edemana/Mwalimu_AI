import { logger } from "../logging"; // Import logger for logging messages
import crypto from "crypto"; // Import crypto for secure operations (though not used in this file)
import { sign } from "jsonwebtoken"; // Import sign from jsonwebtoken for creating JWTs

import { validateJWT, validateUserInfo } from "../middleware/validators"; // Import validation middleware
import express, { NextFunction, Request, Response, Router } from "express"; // Import express and related types
import { prettyPrint } from "../"; // Import prettyPrint for formatted output
import UserService from "../services/UserService"; // Import UserService for user-related operations
import { CustomRequest, LoginRequest, UserInfo } from "../types"; // Import custom types
import { handleUserValidation } from "../middleware/handlers"; // Import validation handling middleware
import LearningService from "../services/LearningService"; // Import LearningService for lesson-related operations
import { NewLesson } from "src/db/schema/lesson"; // Import NewLesson schema
import { Lesson } from "src/db/schema/lesson"; // Import Lesson schema

const learning = Router(); // Create an express router instance for learning routes

// Route to get basic info about the learning path
learning.get("/info", (_req, res) => {
    res.send("Learning path route"); // Send a basic response indicating the learning route
});

// Apply JWT validation middleware to all routes in this router
learning.use(validateJWT);

// Route to create a new lesson with a given prompt
learning.post(
    "/create",
    async (
        req: CustomRequest<unknown, { lessonPrompt: string; userId: string }>,
        res,
    ) => {
        const { lessonPrompt, userId } = req.body; // Extract lesson prompt and user ID from request body

        logger.info(`Creating lesson with prompt ${lessonPrompt}`); // Log the creation operation
        LearningService.Create(lessonPrompt, userId) // Call Create method from LearningService
            .then(({ status, data }) => {
                return res.status(status).send(data); // Send response with status and data
            })
            .catch((err) => {
                logger.error(`Create lesson: ${err}`); // Log errors
                return res.status(500).send({ msg: "Server Error" }); // Send server error response
            });
    },
);

// Route to add an existing lesson to the user's learning path
learning.post(
    "/add",
    (
        req: CustomRequest<unknown, { lesson: NewLesson; userId: string }>,
        res,
    ) => {
        const { lesson, userId } = req.body; // Extract lesson and user ID from request body
        LearningService.Add(lesson, userId) // Call Add method from LearningService
            .then(({ status, data }) => {
                return res.status(status).send(data); // Send response with status and data
            })
            .catch((err) => {
                logger.error(`Add lesson: ${err}`); // Log errors
                return res.status(500).send({ msg: "Server Error" }); // Send server error response
            });
    },
);

// Route to get all lessons for a user or a specific lesson by ID
learning.get("/lessons/:id", (req, res) => {
    const { id } = req.params; // Extract ID from route parameters

    LearningService.GetAll(id) // Call GetAll method from LearningService
        .then(({ status, data }) => {
            return res.status(status).send(data); // Send response with status and data
        })
        .catch((err) => {
            logger.error(`Get lesson: ${err}`); // Log errors
            return res.status(500).send({ msg: "Server Error" }); // Send server error response
        });
});

// Route to update a lesson by ID
learning.put(
    "/update/:id",
    (req: CustomRequest<unknown, { lesson: Partial<Lesson> }>, res) => {
        const { id } = req.params; // Extract ID from route parameters
        const { lesson } = req.body; // Extract lesson updates from request body

        LearningService.Update(lesson, id) // Call Update method from LearningService
            .then(({ status, data }) => {
                return res.status(status).send(data); // Send response with status and data
            })
            .catch((err) => {
                logger.error(`Update lesson: ${err}`); // Log errors
                return res.status(500).send({ msg: "Server Error" }); // Send server error response
            });
    },
);

// Route to delete a lesson by ID
learning.delete("/delete/:id", (req, res) => {
    const { id } = req.params; // Extract ID from route parameters

    LearningService.Delete(id) // Call Delete method from LearningService
        .then(({ status, data }) => {
            return res.status(status).send(data); // Send response with status and data
        })
        .catch((err) => {
            logger.error(`Delete lesson: ${err}`); // Log errors
            return res.status(500).send({ msg: "Server Error" }); // Send server error response
        });
});

export default learning; // Export the router for use in other parts of the application
