import { FilterData } from './filterData';
import { User } from './user';

declare module 'express' {
    interface Request {
        filterDate?: FilterData;
        files?: any;
        user?: User;
    }
}
