import {
    pgTable,
    varchar,
    uuid,
    boolean,
    serial,
    jsonb,
    timestamp,
} from "drizzle-orm/pg-core"; // Import types and functions from drizzle ORM for PostgreSQL
import { InferInsertModel, InferSelectModel, eq, sql } from "drizzle-orm"; // Import utility functions for queries and type inference
import db from "../../db"; // Import the database instance
import { users } from "./user"; // Import the users table schema for foreign key reference

// Define the schema for the 'lesson' table
export const lessons = pgTable("lesson", {
    lessonId: serial("lesson_id").primaryKey(), // Auto-incrementing primary key for lesson ID
    userId: uuid("user_id").references(() => users.userId), // Foreign key referencing the user ID from the 'users' table
    topic: varchar("topic").notNull(), // Topic of the lesson
    subGoals: jsonb("sub_goals").notNull(), // JSONB column to store sub-goals
    createdAt: timestamp("created_at").defaultNow(), // Timestamp for when the lesson was created, default to current time
    updatedAt: timestamp("updated_at").defaultNow(), // Timestamp for when the lesson was last updated, default to current time
});

// Define TypeScript types for querying and inserting lessons
export type Lesson = InferSelectModel<typeof lessons>; // Type for selecting lessons
export type NewLesson = InferInsertModel<typeof lessons>; // Type for inserting new lessons

// Define queries for selecting lessons based on different criteria
const lessonSelectByUserId = db
    .select()
    .from(lessons)
    .where(eq(lessons.userId, sql.placeholder("id"))); // Select lessons by user ID

const lessonSelectByTopic = db
    .select()
    .from(lessons)
    .where(eq(lessons.topic, sql.placeholder("topic"))); // Select lessons by topic

const lessonSelectByLessonId = db
    .select()
    .from(lessons)
    .where(eq(lessons.lessonId, sql.placeholder("id"))); // Select a lesson by lesson ID

const lessonDeleteById = db
    .delete(lessons)
    .where(eq(lessons.lessonId, sql.placeholder("id"))); // Delete a lesson by lesson ID

// Define functions to interact with the 'lesson' table
export const getLessonByTopic = async (topic: string) =>
    lessonSelectByTopic.execute({ topic }); // Get lessons by topic

export const getUserLessons = async (id: string) =>
    lessonSelectByUserId.execute({ id }); // Get lessons by user ID

export const insertLesson = async (lesson: NewLesson) =>
    db.insert(lessons).values(lesson).returning(); // Insert a new lesson and return the inserted data

export const deleteLesson = async (id: number) =>
    lessonDeleteById.execute({ id }); // Delete a lesson by its ID

export const updateLesson = async (id: number, lesson: Partial<Lesson>) => {
    const now = new Date(); // Current timestamp
    lesson["updatedAt"] = now; // Update the 'updatedAt' timestamp
    return db
        .update(lessons)
        .set(lesson)
        .where(eq(lessons.lessonId, id))
        .returning(); // Update a lesson and return the updated data
};
