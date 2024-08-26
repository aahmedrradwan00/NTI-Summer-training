import mongoose from 'mongoose';

//DataBase connection
const database = () => {
    mongoose
        .connect(process.env.DB!)
        .then(() => console.log('Connected!'))
        .catch((err: Error) => console.log(err));
};

export default database;
