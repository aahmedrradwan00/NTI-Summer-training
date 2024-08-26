import express from 'express';
import dotenv from 'dotenv';
import database from './config/database';
import mountRoutes from './routes';
import { Server } from 'http';

const app: express.Application = express();
app.use(express.json());
dotenv.config();

//DataBase connection
database();

// Routes
mountRoutes(app);

const port = process.env.PORT;

//server
const server: Server = app.listen(port, () => {
    console.log(`App is Listen on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    // Server close after all requests are completed
    server.close(() => {
        console.error('shutting the App down');
        process.exit(1);
    });
});
