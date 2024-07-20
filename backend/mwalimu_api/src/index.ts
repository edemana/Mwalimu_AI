import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

import { httpLogger, logger } from "./logging";

import { HOST, PORT } from "./constants";

import auth from "./routes/auth";
import learning from "./routes/learning";

dotenv.config();
const app = express();

app.use(compression());
if (process.env.NODE_ENV !== "development") {
    app.use(cors({}));
} else {
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
}
app.use(express.json());
app.use(httpLogger);
app.use(helmet());

export const prettyPrint = <T>(log: T) => {
    return JSON.stringify(log, undefined, 4);
};

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ msg: "Server error!" });
});

app.get("/info", (_req, res, _next) => {
    res.send("Mwalimu AI API Server");
});

app.use("/auth", auth);

app.use("/learning", learning);

export default app;

if (process.env.NODE_ENV !== "testing") {
    (() => {
        app.listen(PORT, HOST, () => {
            console.log(`Mode: ${process.env.NODE_ENV}`);
            console.log(`Listening on http://${HOST}:${PORT}`);
        });
    })();
}
