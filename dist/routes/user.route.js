"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.post('/order', async (req, res) => {
    const response = await (0, user_controller_1.orderController)(req);
    res.json(response).status(200);
});
userRouter.get('/orders', async (req, res) => {
    const response = await (0, user_controller_1.userOrdersController)(req);
    res.json(response).status(200);
});
userRouter.post('/address', async (req, res) => {
    const response = await (0, user_controller_1.addressController)(res);
    res.json(response).status(200);
});
exports.default = userRouter;
