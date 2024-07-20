import dotenv from "dotenv";
dotenv.config();

let PORT: number;
switch (process.env.NODE_ENV) {
    case "development":
        PORT = 10500;
        break;
    case "production":
        PORT = 10500;
        break;
    default:
        PORT = 10500;
}
export const HOST = "0.0.0.0";

export const ROUNDS = 10;

// export const PG_USER = process.env.PG_USER || "mads";
// export const PG_PASS = process.env.PG_PASSWORD || "";
// export const PG_HOST = process.env.PG_HOST || "0.0.0.0";
export const PG_PORT = 5432;

export const PROD_CONNECTION_STRING = process.env.POSTGRES_URL;

let PG_USER: string;
let PG_PASS: string;
let PG_HOST: string;
let PG_DB: string;

switch (process.env.NODE_ENV) {
    case "development":
        PG_USER = "mads";
        PG_PASS = "";
        PG_HOST = "0.0.0.0";
        PG_DB = "mwalimu";
        break;
    case "production":
        PG_USER = process.env.PG_USER!;
        PG_PASS = process.env.PG_PASSWORD!;
        PG_HOST = process.env.PG_HOST!;
        PG_DB = process.env.PG_DATABASE!;
        break;
    case "testing":
        PG_USER = "mads";
        PG_PASS = "";
        PG_HOST = "0.0.0.0";
        PG_DB = "mwalimuTest";
        break;
}

// if (process.env.NODE_ENV == "testing") {
//     PG_DB = "bossTest";
// } else if (process.env.NODE_ENV == "development") {
//     PG_DB = "boss";
// } else {
//     PG_DB = process.env.PG_DATABASE || "boss";
// }

export { PG_DB, PORT, PG_PASS, PG_USER, PG_HOST };
