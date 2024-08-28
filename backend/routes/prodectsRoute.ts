import { Router } from 'express';
import { createProductsValidator, deleteProductsValidator, getProductsValidator } from '../utils/validation/productsValidator';
import { updateCategoryValidator } from '../utils/validation/categoriesValidator';
import { createProducts, deleteProduct, getProduct, getProducts, resizeImage, updateProduct, uploadProductImages } from '../controllers/productsController';
import { allowedTo, checkActive, protectRoutes } from '../controllers/auth';
const ProductsRouter: Router = Router();

ProductsRouter.route('/').get(getProducts).post(protectRoutes,checkActive,allowedTo("manager","admin"),uploadProductImages, resizeImage, createProductsValidator, createProducts);
ProductsRouter.route('/:id').get(getProductsValidator, getProduct).put(protectRoutes,checkActive,allowedTo("manager","admin"),updateCategoryValidator, updateProduct).delete(protectRoutes,checkActive,allowedTo("manager","admin"),deleteProductsValidator, deleteProduct);

export default ProductsRouter;
