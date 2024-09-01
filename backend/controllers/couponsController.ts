import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';
import couponsModel from '../models/couponsModel';
import { Coupons } from '../interfaces/coupons';

//create Coupons
export const createCoupon = createOne<Coupons>(couponsModel);
//get all Coupons
export const getCoupons  = getAll<Coupons>(couponsModel,"Coupons");
//get one Coupons
export const getCoupon = getOne<Coupons>(couponsModel);
//update one Coupons
export const updateCoupon = updateOne<Coupons>(couponsModel);
// delete Coupons
export const deleteCoupon = deleteOne<Coupons>(couponsModel);
