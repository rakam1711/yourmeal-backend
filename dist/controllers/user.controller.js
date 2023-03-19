"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressController = exports.userOrdersController = exports.orderController = void 0;
const database_1 = require("../database");
const orderController = async (req) => {
    const { order } = req.body;
    const errors = {};
    const data = {};
    try {
        const newOrder = await database_1.Orders.create({ ...order, user: req.user });
        if (!newOrder) {
            errors.message = "Unable to place the order. Please try later";
        }
        await database_1.Users.findByIdAndUpdate(req.user, {
            $push: { orders: newOrder._id }
        });
    }
    catch (error) {
        errors.message = error;
    }
    finally {
        return {
            success: Object.keys(errors).length < 1,
            errors,
            data
        };
    }
};
exports.orderController = orderController;
const userOrdersController = async (req) => {
    const errors = {};
    const data = {};
    try {
        const orders = await database_1.Orders.find({ user: req.user });
        data.orders = orders;
    }
    catch (error) {
        errors.message = error;
    }
    finally {
        return {
            success: Object.keys(errors).length < 1,
            errors,
            data
        };
    }
};
exports.userOrdersController = userOrdersController;
const addressController = async (req) => {
    const { address } = req.body;
    const errors = {};
    const data = {};
    try {
        const user = await database_1.Users.findByIdAndUpdate(req.user, { address });
        if (!user) {
            errors.message = "User not found. Invalid token";
        }
    }
    catch (error) {
        errors.message = error;
    }
    finally {
        return {
            success: Object.keys(errors).length < 1,
            errors,
            data
        };
    }
};
exports.addressController = addressController;
