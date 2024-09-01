import { Router } from 'express';
import { allowedTo, checkActive, protectRoutes } from '../controllers/authController';
import { createOrder, getOrder, getOrders, isOrderDelivered, isOrderPaid } from '../controllers/ordersController';
import { filterOrders } from './../controllers/ordersController';
import { createOrderValidator, isOrderDeliveredValidator, isOrderPaidValidator } from './../utils/validation/ordersValidator';
const OrdersRouter: Router = Router();

// Middlewares
// Protect routes and allow only 'user' role
OrdersRouter.use(protectRoutes, checkActive, allowedTo('user'));

// Get all orders or create a new one
OrdersRouter.route('/').get(filterOrders, getOrders).post(createOrderValidator, createOrder);

// Get order by ID
OrdersRouter.route('/:id').get(getOrder);

// Allow only 'manager' or 'admin'
OrdersRouter.use(allowedTo('manager', 'admin'));

// Mark order as paid
OrdersRouter.route('/:id/paid').put(isOrderPaidValidator, isOrderPaid);

// Mark order as delivered
OrdersRouter.route('/:id/delivered').put(isOrderDeliveredValidator, isOrderDelivered);

export default OrdersRouter;
