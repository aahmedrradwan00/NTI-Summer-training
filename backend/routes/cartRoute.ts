import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { addProductToCart, applyCoupon, clearCart, getLoggedUserCart, removeProductFromCart } from '../controllers/cartController';
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from '../utils/validation/cartValidator';
import { updateProduct } from '../controllers/productsController';
const CartsRouter: Router = Router();

// Middlewares
// Protect routes and allow only 'user' role
CartsRouter.use(protectRoutes, checkActive, allowedTo('user'));
// apply coupon
CartsRouter.put('/applycoupon', applyCoupon);
// Get all user cart or create a addProductToCart
CartsRouter.route('/').get(getLoggedUserCart).post(addProductToCartValidator, addProductToCart).delete(clearCart);
// update Product and remove product from cart
CartsRouter.route('/:itemId').put(updateProductQuantityValidator, updateProduct).delete(removeProductFromCartValidator, removeProductFromCart);

export default CartsRouter;
