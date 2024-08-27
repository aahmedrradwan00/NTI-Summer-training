import { FilterData } from "./filterData";

declare module "express"{
    interface Request{
        filterDate?:FilterData
    }
}