import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";

import userRouter from "./routes/userRoutes.js";
import listRouter from "./routes/listRoutes.js";
import groupRouter from "./routes/groupRoutes.js";  
import itemRouter from "./routes/itemRoutes.js";
import dishRouter from "./routes/dishRoutes.js";
import mealRouter from "./routes/mealRoutes.js";

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
app.use('/api/v1/group', groupRouter);
app.use('/api/v1/list', listRouter);
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/dish', dishRouter);
app.use('/api/v1/meal', mealRouter);

export default app;