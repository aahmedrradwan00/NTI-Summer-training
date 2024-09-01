import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from '../controllers/wishlistController';

const wishlistRouter: Router = Router();

// Protect routes, ensure user is active, and restrict access to 'user' role
wishlistRouter.use(protectRoutes, checkActive, allowedTo('user'));

// Get or add products to the wishlist
wishlistRouter.route('/').get(getLoggedUserWishlist).post(addProductToWishlist);

// Remove a product from the wishlist
wishlistRouter.route('/:product').delete(removeProductFromWishlist);

export default wishlistRouter;
