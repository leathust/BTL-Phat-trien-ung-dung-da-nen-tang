import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: "./config.env"});
import app from "./app.js";

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB connection successful!"));

const port = 3000;
app.listen(port, () => {
    console.log(`Server has running on port ${port}...`);
}); 