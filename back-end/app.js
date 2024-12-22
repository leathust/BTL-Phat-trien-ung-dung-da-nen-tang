import express from "express";
import morgan from "morgan";
import userRouter from "./routes/userRoutes.js";
import listRouter from "./routes/listRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
if(process.env.NODE_ENV = "development") {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/list', listRouter);

export default app;