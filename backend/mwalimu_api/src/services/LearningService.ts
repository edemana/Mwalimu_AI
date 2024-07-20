import OpenAI from "openai";
import { logger } from "../logging";
import { ServiceReturn } from "../types";
import { prettyPrint } from "..";
import { resolveError } from "../utils/catchError";
import {
    NewLesson,
    Lesson,
    getUserLessons,
    insertLesson,
    updateLesson,
    deleteLesson,
} from "../db/schema/lesson";

class LearningService {
    openai: OpenAI;
    persona: string =
        "You are a learning path generator. You can only generate learning paths based on the topics presented to you. A learning path is a explicit set of sub goals needed to learn a given topic. Your response should be in json in the format, {'topic': 'TOPIC NAME', subGoals: {[key:string]: SubGoal}}, where the SubGoal type has a description of the subgoal and whether it has been completed or not, with each subgoal being credible steps to learning the given topic";

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async GetAll(userId: string): Promise<ServiceReturn> {
        try {
            const lessons = await getUserLessons(userId);
            return { status: 200, data: lessons };
        } catch (error) {
            const err = resolveError(error);
            logger.error(`Get lessons: ${err.stack}`);
            return {
                status: 500,
                data: { msg: "Something went wrong while fetching lessons" },
            };
        }
    }

    async Create(lessonPrompt: string, userId: string): Promise<ServiceReturn> {
        try {
            const response = await this.openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: this.persona,
                    },
                    {
                        role: "user",
                        content: `Generate a learning path based on the following prompt: ${lessonPrompt}`,
                    },
                ],
                model: "gpt-4o-mini",
                response_format: { type: "json_object" },
            });
            const lesson: Lesson = JSON.parse(
                response.choices[0].message.content!,
            );
            lesson["userId"] = userId;
            return { status: 200, data: lesson };
        } catch (error) {
            const err = resolveError(error);
            logger.error(`Create lesson: ${err.stack}`);
            return {
                status: 500,
                data: { msg: "Something went wrong while creating lessons" },
            };
        }
    }

    async Add(lesson: NewLesson): Promise<ServiceReturn> {
        try {
            const newLesson = await insertLesson(lesson);
            logger.info(`Lessong added: ${prettyPrint(newLesson)}`);
            return {
                status: 200,
                data: {
                    msg: `Successfully inserted lesson with topic ${lesson.topic}`,
                },
            };
        } catch (error) {
            const err = resolveError(error);
            logger.error(`Add lesson: ${err.stack}`);
            return {
                status: 500,
                data: { msg: "Something went wrong while adding lessons" },
            };
        }
    }

    async Update(lesson: Lesson, id: number): Promise<ServiceReturn> {
        try {
            const updatedLesson = await updateLesson(id, lesson);
            logger.info(`Lesson updated: ${prettyPrint(updatedLesson)}`);
            return {
                status: 200,
                data: {
                    msg: `Successfully updated lesson with topic ${lesson.topic}`,
                },
            };
        } catch (error) {
            const err = resolveError(error);
            logger.error(`Update lesson: ${err.stack}`);
            return {
                status: 500,
                data: { msg: "Something went wrong while updating lessons" },
            };
        }
    }

    async Delete(lessonId: number): Promise<ServiceReturn> {
        try {
            const deletedLesson = await deleteLesson(lessonId);
            logger.info(`Lesson deleted: ${prettyPrint(deletedLesson)}`);
            return {
                status: 200,
                data: {
                    msg: `Successfully deleted lesson with id ${lessonId}`,
                },
            };
        } catch (error) {
            const err = resolveError(error);
            logger.error(`Delete lesson: ${err.stack}`);
            return {
                status: 500,
                data: { msg: "Something went wrong while deleting lessons" },
            };
        }
    }
}

export default new LearningService();
