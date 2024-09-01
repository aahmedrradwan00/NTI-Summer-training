import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { addProductToCart, applyCoupon, getLoggedUserCart, removeProductFromCart } from '../controllers/cartController';
import { addProductToCartValidator, removeProducyFromCartValidator, updateProductQuantityValidator } from '../utils/validation/cartValidator';
import { updateProduct } from '../controllers/productsController';
const CartsRouter: Router = Router();

// Middlewares
// Protect routes and allow only 'user' role
CartsRouter.use(protectRoutes, checkActive, allowedTo('user'));
// apply coupon
CartsRouter.put('/applycoupon', applyCoupon);
// Get all user cart or create a addProductToCart
CartsRouter.route('/').get(getLoggedUserCart).post(addProductToCartValidator, addProductToCart);
// update Product and remove product from cart
CartsRouter.route('/:itemId').put(updateProductQuantityValidator, updateProduct).delete(removeProducyFromCartValidator, removeProductFromCart);

export default CartsRouter;
