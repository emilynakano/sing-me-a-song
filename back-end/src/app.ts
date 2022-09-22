import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import e2eRouter from './routers/e2eRouter.js';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'test') {
    app.use(e2eRouter);
}

app.use(errorHandlerMiddleware);

export default app;
