import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from '../controllers/wishlist';

const wishlistRouter: Router = Router();

wishlistRouter.use(protectRoutes, checkActive, allowedTo('user'));
wishlistRouter.route('/').get(getLoggedUserWishlist).post(addProductToWishlist);
wishlistRouter.route('/:product').delete(removeProductFromWishlist);

export default wishlistRouter;
