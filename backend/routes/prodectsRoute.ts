import { Router } from 'express';
import { createProductsValidator, deleteProductsValidator, getProductsValidator } from '../utils/validation/productsValidator';
import { updateCategoryValidator } from '../utils/validation/categoriesValidator';
import { createProducts, deleteProduct, getProduct, getProducts, updateProduct, upload } from '../controllers/productsController';
const ProductsRouter: Router = Router();

ProductsRouter.route('/').get(getProducts).post(upload.single('cover'),createProductsValidator, createProducts);
ProductsRouter.route('/:id').get(getProductsValidator, getProduct).put(updateCategoryValidator, updateProduct).delete(deleteProductsValidator,deleteProduct);

export default ProductsRouter;
