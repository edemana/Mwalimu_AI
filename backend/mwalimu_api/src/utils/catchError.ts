import { logger } from "../logging";

export const resolveError = (error: unknown) => {
    if (error instanceof Error) {
        return error;
    }

    logger.error(`Unknown error: ${error as string}`);
    return new Error("Unknown error");
};
