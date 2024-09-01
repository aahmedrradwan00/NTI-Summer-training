import { NextFunction, Request, Response } from 'express';
import { getAll, getOne } from './refactorHandler';
import { Orders } from '../interfaces/orders';
import ordersModel from '../models/ordersModel';
import { FilterData } from '../interfaces/filterData';
import asyncHandler from 'express-async-handler';
import cartsModel from '../models/cartsModel';
import ApiErrors from '../utils/apiErrors';
import { CartItem } from '../interfaces/carts';
import { it } from 'node:test';
import productsModel from '../models/productsModel';

// filterOrders
export const filterOrders = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role) {
        let filterData: FilterData = { user: req.user?._id };
    }
    next();
};

// get all orders
export const getOrders = getAll<Orders>(ordersModel, 'Order');
// get one order
export const getOrder = getOne<Orders>(ordersModel);
//create order
export const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const taxPrice: number = 100;
    const cart = await cartsModel.findOne({ user: req.user?._id });
    if (!cart) return next(new ApiErrors('cart not Found', 404));
    const cartPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    const totalOrderPrice: number = cartPrice + taxPrice;

    const order: Orders = await ordersModel.create({
        user: req.user?._id,
        totalPrice: totalOrderPrice,
        cartItems: cart.cartItems,
        address: req.body.address,
        taxPrice,
    });
    if (order) {
        const bulkOption = cart.cartItems.map((item: CartItem) => ({
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
            },
        }));
        await productsModel.bulkWrite(bulkOption);
        await cartsModel.findByIdAndDelete(cart._id);
    }
    res.status(204).json({ date: order });
});

// update order isPaid,isDeliverd
export const isOrderPaid = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // const order = await ordersModel.findById(req.params.id);
    // if (!order) return next(new ApiErrors('order not found', 404));
    // order.isPaid = true;
    // order.paidAt = Date.now();
    const order = await ordersModel.findByIdAndUpdate(req.params.id, { isPaid: true, paidAt: Date.now() }, { new: true });
    if (!order) return next(new ApiErrors('order not found', 404));
    res.status(200).json({ date: order });
});

export const isOrderDelivered = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const order = await ordersModel.findByIdAndUpdate(req.params.id, { isDelivered: true, deliveredAt: Date.now() }, { new: true });
    if (!order) return next(new ApiErrors('order not found', 404));
    res.status(200).json({ date: order });
});
