import { drizzle } from "drizzle-orm/node-postgres"; // Import drizzle ORM for PostgreSQL
import { Pool } from "pg"; // Import Pool class from pg module for database connection pooling
import * as constants from "../constants"; // Import constants for database configuration
import { logger } from "../logging"; // Import logger for logging database connection info

// Set the SSL flag based on the environment
let ssl = false;

// Enable SSL if running in production environment
if (process.env.NODE_ENV == "production") {
    ssl = true;
}

// Create a new Pool instance for managing PostgreSQL connections
let pool = new Pool({
    host: constants.PG_HOST, // Database host
    port: constants.PG_PORT, // Database port
    user: constants.PG_USER, // Database user
    password: constants.PG_PASS, // Database password
    database: constants.PG_DB, // Database name
    ssl: ssl, // SSL configuration for secure connections
});

// Log database connection information
logger.info(
    "Connecting to database with info:" +
        `\nHOST: ${constants.PG_HOST}` +
        `\nPORT: ${constants.PG_PORT}` +
        `\nUSER: ${constants.PG_USER}`,
);

// Initialize drizzle ORM with the PostgreSQL connection pool
const db = drizzle(pool, { logger: true });

export default db; // Export the configured drizzle ORM instance
