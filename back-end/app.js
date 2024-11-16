import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";
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
// app.use((req, res, next) => {
//     console.log("Hello, your request will be pass over here - fun middlware!");
//     req.requestTime = new Date().toISOString();
//     next();
// })

//Routes but it also as middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;