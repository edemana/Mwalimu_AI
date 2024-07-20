import { pgTable, varchar, uuid, boolean } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, eq, sql } from "drizzle-orm";
import db from "../../db";

export const users = pgTable("user", {
    userId: uuid("user_id").primaryKey().defaultRandom(),
    email: varchar("email").notNull(),
    salt: varchar("salt").notNull(),
    passhash: varchar("passhash").notNull(),
    level: varchar("level").notNull(),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

const userSelectById = db
    .select()
    .from(users)
    .where(eq(users.userId, sql.placeholder("id")));

const userSelectByEmail = db
    .select()
    .from(users)
    .where(eq(users.email, sql.placeholder("email")))
    .limit(1);

const userDeleteById = db
    .delete(users)
    .where(eq(users.userId, sql.placeholder("id")));

export const getUser = async (email: string) =>
    await userSelectByEmail.execute({ email });

export const getUserById = async (id: string) =>
    await userSelectById.execute({ id: id });

export const insertUser = async (user: NewUser) =>
    db.insert(users).values(user).returning();

export const deleteUser = async (id: string) =>
    await userDeleteById.execute({ id });

export const updateUser = async (id: string, user: Partial<User>) =>
    db.update(users).set(user).where(eq(users.userId, id)).returning();
