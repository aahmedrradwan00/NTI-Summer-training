import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from '../controllers/wishlistController';

const wishlistRouter: Router = Router();

wishlistRouter.use(protectRoutes, checkActive, allowedTo('user'));
wishlistRouter.route('/').get(getLoggedUserWishlist).post(addProductToWishlist);
wishlistRouter.route('/:product').delete(removeProductFromWishlist);

export default wishlistRouter;
