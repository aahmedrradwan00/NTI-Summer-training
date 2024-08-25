import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app: express.Application = express();

app.use(express.json());
dotenv.config();

//DataBase connection
mongoose
    .connect(process.env.DB!)
    .then(() => console.log('Connected!'))
    .catch((err: Error) => console.log(err));

app.get('/', function (req: express.Request, res: express.Response) {
    res.json({ massage: 'hello world' });
});

//server
app.listen(process.env.PORT);
