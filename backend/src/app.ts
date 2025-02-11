import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import infoRoutes from './routes/info';
import userRoutes from './users/user.routes';
import projectRoutes from './routes/project';
import * as expressWinston from 'express-winston';
import * as winston from 'winston';
import debug from 'debug';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const debugLog: debug.IDebugger = debug('app');
app.use(cors());
app.use(bodyParser.json());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/', infoRoutes);

app.listen(PORT, () => debugLog(`Server running at http://localhost:${PORT}`));