import express from 'express';
import fileUpload from 'express-fileupload';
import { startDB } from './startup/db.js';
import { Routes } from './routes/index.js';
import cors from 'cors';

const app = express();
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({}));

startDB();

Routes(app);

export default app;
