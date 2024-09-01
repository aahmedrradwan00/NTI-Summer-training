import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import cartsModel from '../models/cartsModel';
import ApiErrors from '../utils/apiErrors';
import productsModel from '../models/productsModel';
import { CartItem, Carts } from '../interfaces/carts';
import couponsModel from '../models/couponsModel';

// calclate Total Price
const calcTotalPrice = (cart: Carts) => {
    let totalPrice: number = 0;
    cart.cartItems.forEach((item: CartItem) => {
        totalPrice += item.quantity * item.price;
    });
    cart.totalPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
};

// Get user cart
export const getLoggedUserCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cart = await cartsModel.findOne({ user: req.user?._id });
    if (!cart) return next(new ApiErrors('Card not found', 404));
    res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// Add product to cart
export const addProductToCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const product = await productsModel.findById(req.body.product);
    if (!product) return next(new ApiErrors('err', 404));
    let cart: any = await cartsModel.findOne({ user: req.user?._id });
    if (!cart) {
        cart = await cartsModel.create({
            user: req.user?._id,
            cartItems: [{ product: req.body.product, price: product?.price, quantity: 1 }],
        });
    } else {
        const productIndex = cart.cartItems.findIndex((item: CartItem) => {
            return item.product._id!.toString() === req.body.product;
        });
        if (productIndex !== -1) cart.cartItems[productIndex].quantity += 1;
        else cart.cartItems.push({ product: req.body.product, price: product?.price });
    }
    calcTotalPrice(cart);
    await cart.save();
    res.status(200).json({ length: cart.cartItems.length, data: cart });
});

//remove product from cart
export const removeProductFromCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cart: any = await cartsModel.findByIdAndUpdate({ user: req.user?._id }, { $pull: { cartItems: { product: req.body.product } } }, { new: true });
    calcTotalPrice(cart);
    await cart.save();
    res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// update product quantity
export const updateCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cart = await cartsModel.findOne({ user: req.user?._id });
    if (!cart) return next(new ApiErrors('cart not found', 404));
    const productIndex = cart.cartItems.findIndex((item: CartItem) => item._id!.toString() === req.params.itemId.toString());
    if (productIndex) {
        cart.cartItems[productIndex].quantity = req.body.quantity;
        calcTotalPrice(cart);
    } else return next(new ApiErrors('product not found', 404));
    await cart.save();
    res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// Apply coupon
export const applyCoupon = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const coupon = await couponsModel.findOne({ name: req.body.name, expireTime: { $gt: Date.now() } });
    if (!coupon) return next(new ApiErrors('invlid or expired coupon', 404));
    const cart: any = await cartsModel.findOne({ user: req.user?._id });
    const totalPrice: number = cart.totalPrice;
    const totalPriceAfterDiscount = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2);
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    await cart.save();
    res.status(200).json({ length: cart.cartItems.length, data: cart });
});

// clear cart
export const clearCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await cartsModel.findOneAndDelete({ user: req.user?._id });
    res.status(204);
});
