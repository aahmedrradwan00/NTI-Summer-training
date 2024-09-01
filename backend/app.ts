import express from 'express';
import dotenv from 'dotenv';
import database from './config/database';
import mountRoutes from './routes';
import { Server } from 'http';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import { I18n } from 'i18n';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';

const app: express.Application = express();
app.use(express.json());
dotenv.config();

// compression
app.use(compression());
// hpp
app.use(hpp({ whitelist: ['price', 'category', 'subcategory', 'ratingAverage', 'sold'] }));
//cors
app.use(cors({ origin: ['http://localhost:3001'], methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }));
// mongoSanitize
app.use(mongoSanitize());
// helmet
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(express.static('uploads'));

//DataBase connection
database();

// transalte

const i18n = new I18n({
    locales: ['en', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang',
});
app.use(i18n.init)


// Routes
mountRoutes(app);

//server
const port = process.env.PORT;
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
