import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import infoRoutes from './src/routes/info';
import authRoutes from './src/routes/auth';
import projectRoutes from './src/routes/project';
import hotReloadMiddleware from '@devmade/express-hot-reload';

dotenv.config();

const app = express();
app.use(hotReloadMiddleware({ watchFolders: ["./src"] }));

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/', infoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));