import winston from "winston";
import morgan from "morgan";

const {
    combine,
    timestamp,
    printf,
    json,
    colorize,
    align,
    splat,
    errors,
    prettyPrint,
} = winston.format;

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const transports =
    process.env.NODE_ENV === "production"
        ? [
              new winston.transports.File({ filename: "./logs/combined.log" }),
              new winston.transports.Console(),
          ]
        : [new winston.transports.Console()];

const exceptionHandlers =
    process.env.NODE_ENV === "production"
        ? [
              new winston.transports.File({
                  filename: "./logs/exceptions.log",
              }),
              new winston.transports.Console(),
          ]
        : [new winston.transports.Console()];

const rejectionHandlers =
    process.env.NODE_ENV === "production"
        ? [
              new winston.transports.File({
                  filename: "./logs/rejections.log",
              }),
              new winston.transports.Console(),
          ]
        : [new winston.transports.Console()];

const logger = winston.createLogger({
    levels: logLevels,
    level: process.env.LOG_LEVEL || "info",
    format: combine(
        prettyPrint(),
        json(),
        errors({ stack: true }),
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        align(),
        colorize(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    ),
    transports: transports,
    exceptionHandlers: exceptionHandlers,
    rejectionHandlers: rejectionHandlers,
});

const httpLogger = morgan("short", {
    stream: { write: (message) => logger.info(message.trim()) },
});

export { logger, httpLogger };
