import {
    pgTable,
    varchar,
    uuid,
    boolean,
    serial,
    jsonb,
    timestamp,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, eq, sql } from "drizzle-orm";
import db from "../../db";
import { users } from "./user";

export const lessons = pgTable("lesson", {
    lessonId: serial("lesson_id").primaryKey(),
    userId: uuid("user_id").references(() => users.userId),
    topic: varchar("topic").notNull(),
    subGoals: jsonb("sub_goals").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export type Lesson = InferSelectModel<typeof lessons>;
export type NewLesson = InferInsertModel<typeof lessons>;

const lessonSelectByUserId = db
    .select()
    .from(lessons)
    .where(eq(lessons.userId, sql.placeholder("id")));

const lessonSelectByTopic = db
    .select()
    .from(lessons)
    .where(eq(lessons.topic, sql.placeholder("topic")));

const lessonSelectByLessonId = db
    .select()
    .from(lessons)
    .where(eq(lessons.lessonId, sql.placeholder("id")));

const lessonDeleteById = db
    .delete(lessons)
    .where(eq(lessons.lessonId, sql.placeholder("id")));

export const getLessonByTopic = async (topic: string) =>
    lessonSelectByTopic.execute({ topic });

export const getUserLessons = async (id: string) =>
    lessonSelectByUserId.execute({ id });

export const insertLesson = async (lesson: NewLesson) =>
    db.insert(lessons).values(lesson).returning();

export const deleteLesson = async (id: number) =>
    lessonDeleteById.execute({ id });

export const updateLesson = async (id: number, lesson: Partial<Lesson>) => {
    const now = new Date();
    lesson["updatedAt"] = now;
    return db
        .update(lessons)
        .set(lesson)
        .where(eq(lessons.lessonId, id))
        .returning();
};
