import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { addProductToCart, applyCoupon, getLoggedUserCart, removeProductFromCart } from '../controllers/cartController';
import { addProductToCartValidator, removeProducyFromCartValidator, updateProductQuantityValidator } from '../utils/validation/cartValidator';
import { updateProduct } from '../controllers/productsController';
const CartsRouter: Router = Router();
CartsRouter.use(protectRoutes, checkActive);

CartsRouter.put('/applycoupon', applyCoupon);

CartsRouter.route('/').get(getLoggedUserCart).post(addProductToCartValidator, addProductToCart);

CartsRouter.route('/:itemId').put(updateProductQuantityValidator, updateProduct).delete(removeProducyFromCartValidator, removeProductFromCart);


export default CartsRouter;
