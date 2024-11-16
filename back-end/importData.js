import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Tour from "./models/tourModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: "./config.env"});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB connection successful!"));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8'));

async function importData() {
    try {
        await Tour.create(tours);
        console.log("Data import successful!");
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

async function deleteData() {
    try {
        await Tour.deleteMany();
        console.log("Delete successful!");
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if(process.argv[2] === '--import') {
    importData();
}

if(process.argv[2] === '--delete') {
    deleteData();
};