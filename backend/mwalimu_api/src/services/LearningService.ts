import OpenAI from "openai"; // Import OpenAI SDK for accessing OpenAI's API
import { logger } from "../logging"; // Import logger for logging messages
import { ServiceReturn } from "../types"; // Import ServiceReturn type for standardized service responses
import { prettyPrint } from ".."; // Import prettyPrint for formatted output
import { resolveError } from "../utils/catchError"; // Import resolveError utility for error handling
import {
    NewLesson,
    Lesson,
    getUserLessons,
    insertLesson,
    updateLesson,
    deleteLesson,
} from "../db/schema/lesson"; // Import lesson-related database operations and types

class LearningService {
    openai: OpenAI; // OpenAI instance for making API calls
    persona: string = 
        "You are a learning path generator. You can only generate learning paths based on the topics presented to you. A learning path is an explicit set of sub-goals needed to learn a given topic. Your response should be in JSON in the format, {'topic': 'TOPIC NAME', subGoals: {[key:string]: SubGoal}}, where the SubGoal type has a description of the subgoal and whether it has been completed or not, with each subgoal being credible steps to learning the given topic"; // Persona description for OpenAI API to generate learning paths

    constructor() {
        // Initialize OpenAI instance with API key
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    // Method to retrieve all lessons for a given user
    async GetAll(userId: string): Promise<ServiceReturn> {
        try {
            const lessons = await getUserLessons(userId); // Fetch lessons from the database
            return { status: 200, data: lessons }; // Return successful response with lessons
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`Get lessons: ${err.stack}`); // Log the error
            return {
                status: 500,
                data: { msg: "Something went wrong while fetching lessons" }, // Return server error response
            };
        }
    }

    // Method to create a new lesson based on a prompt
    async Create(lessonPrompt: string, userId: string): Promise<ServiceReturn> {
        try {
            // Call OpenAI API to generate a learning path
            const response = await this.openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: this.persona, // Set the system message with persona
                    },
                    {
                        role: "user",
                        content: `Generate a learning path based on the following prompt: ${lessonPrompt}`, // User message with prompt
                    },
                ],
                model: "gpt-4o-mini", // Model to use for the completion
                response_format: { type: "json_object" }, // Expected format of the response
            });
            const lesson: Lesson = JSON.parse(
                response.choices[0].message.content!, // Parse the response content as a Lesson
            );
            lesson["userId"] = userId; // Add userId to the lesson
            return { status: 200, data: lesson }; // Return successful response with the created lesson
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`Create lesson: ${err.stack}`); // Log the error
            return {
                status: 500,
                data: { msg: "Something went wrong while creating lessons" }, // Return server error response
            };
        }
    }

    // Method to add a new lesson to the database
    async Add(lesson: NewLesson): Promise<ServiceReturn> {
        try {
            const newLesson = await insertLesson(lesson); // Insert the lesson into the database
            logger.info(`Lesson added: ${prettyPrint(newLesson)}`); // Log the added lesson
            return {
                status: 200,
                data: {
                    msg: `Successfully inserted lesson with topic ${lesson.topic}`, // Return success message
                },
            };
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`Add lesson: ${err.stack}`); // Log the error
            return {
                status: 500,
                data: { msg: "Something went wrong while adding lessons" }, // Return server error response
            };
        }
    }

    // Method to update an existing lesson
    async Update(lesson: Lesson, id: number): Promise<ServiceReturn> {
        try {
            const updatedLesson = await updateLesson(id, lesson); // Update the lesson in the database
            logger.info(`Lesson updated: ${prettyPrint(updatedLesson)}`); // Log the updated lesson
            return {
                status: 200,
                data: {
                    msg: `Successfully updated lesson with topic ${lesson.topic}`, // Return success message
                },
            };
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`Update lesson: ${err.stack}`); // Log the error
            return {
                status: 500,
                data: { msg: "Something went wrong while updating lessons" }, // Return server error response
            };
        }
    }

    // Method to delete a lesson by its ID
    async Delete(lessonId: number): Promise<ServiceReturn> {
        try {
            const deletedLesson = await deleteLesson(lessonId); // Delete the lesson from the database
            logger.info(`Lesson deleted: ${prettyPrint(deletedLesson)}`); // Log the deleted lesson
            return {
                status: 200,
                data: {
                    msg: `Successfully deleted lesson with id ${lessonId}`, // Return success message
                },
            };
        } catch (error) {
            const err = resolveError(error); // Handle and format the error
            logger.error(`Delete lesson: ${err.stack}`); // Log the error
            return {
                status: 500,
                data: { msg: "Something went wrong while deleting lessons" }, // Return server error response
            };
        }
    }
}

export default new LearningService(); // Export an instance of LearningService for use in other parts of the application
