import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/couponsController';
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from '../utils/validation/couponsValidator';
const CouponsRouter: Router = Router();

CouponsRouter.use(protectRoutes, checkActive, allowedTo('manager', 'admin'));
CouponsRouter.route('/').get(getCoupons).post(createCouponValidator, createCoupon);
CouponsRouter.route('/:id').get(getCouponValidator, getCoupon).put(updateCouponValidator, updateCoupon).delete(deleteCouponValidator, deleteCoupon);

export default CouponsRouter;
