"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "test123";
const protect = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.json({ success: false, errors: { message: "User not logged in" }, data: {} }).status(404);
        return;
    }
    const token = authorization.split(" ")[1];
    const data = jsonwebtoken_1.default.decode(token, JWT_SECRET_KEY);
    const user = await database_1.Users.findById(data.userid);
    if (!user) {
        res.json({ success: false, message: "User does not exist " }).status(404);
    }
    req.user = data.userid;
    next();
};
exports.default = protect;
