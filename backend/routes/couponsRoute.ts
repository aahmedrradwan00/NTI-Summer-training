import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/couponsController';
import { createCouponValidator, deleteCouponValidator, getCouponValidator, updateCouponValidator } from '../utils/validation/couponsValidator';
const CouponsRouter: Router = Router();

// Protect and restrict all routes to managers/admins
CouponsRouter.use(protectRoutes, checkActive, allowedTo('manager', 'admin'));

// Get or create coupons
CouponsRouter.route('/').get(getCoupons).post(createCouponValidator, createCoupon);

// Get, update, or delete a coupon by ID
CouponsRouter.route('/:id').get(getCouponValidator, getCoupon).put(updateCouponValidator, updateCoupon).delete(deleteCouponValidator, deleteCoupon);
export default CouponsRouter;
