"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
authRouter.post('/login', async (req, res) => {
    const response = await (0, auth_controller_1.loginController)(req);
    res.json(response).status(200);
});
authRouter.post('/register', async (req, res) => {
    const response = await (0, auth_controller_1.registerController)(req);
    res.json(response).status(200);
});
exports.default = authRouter;
