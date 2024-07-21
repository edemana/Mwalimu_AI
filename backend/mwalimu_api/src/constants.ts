import dotenv from "dotenv"; // Import dotenv for loading environment variables from a .env file
dotenv.config(); // Load environment variables from .env file into process.env

let PORT: number;
// Determine the port number based on the environment
switch (process.env.NODE_ENV) {
    case "development":
        PORT = 10500; // Port for development environment
        break;
    case "production":
        PORT = 10500; // Port for production environment (same as development for simplicity)
        break;
    default:
        PORT = 10500; // Default port if NODE_ENV is not set or is unknown
}
export const HOST = "0.0.0.0"; // Host address to listen on all network interfaces
export const ROUNDS = 10; // Number of rounds for bcrypt password hashing

// Export constants for PostgreSQL configuration and OpenAI API key
export const PG_PORT = 5432; // Default PostgreSQL port

export const OPEN_AI_KEY = process.env.OPENAI_API_KEY; // OpenAI API key from environment variables

let PG_USER: string;
let PG_PASS: string;
let PG_HOST: string;
let PG_DB: string;

// Determine PostgreSQL configuration based on the environment
switch (process.env.NODE_ENV) {
    case "development":
        PG_USER = "mads"; // Default user for development
        PG_PASS = ""; // Default password for development
        PG_HOST = "0.0.0.0"; // Default host for development
        PG_DB = "mwalimu"; // Default database for development
        break;
    case "production":
        PG_USER = process.env.PG_USER!; // Production database user from environment variables
        PG_PASS = process.env.PG_PASSWORD!; // Production database password from environment variables
        PG_HOST = process.env.PG_HOST!; // Production database host from environment variables
        PG_DB = process.env.PG_DATABASE!; // Production database name from environment variables
        break;
    case "testing":
        PG_USER = "mads"; // Default user for testing
        PG_PASS = ""; // Default password for testing
        PG_HOST = "0.0.0.0"; // Default host for testing
        PG_DB = "mwalimuTest"; // Default database for testing
        break;
}

// Export PostgreSQL configuration constants
export { PG_DB, PORT, PG_PASS, PG_USER, PG_HOST };
