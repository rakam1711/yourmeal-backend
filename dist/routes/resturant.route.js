"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resturantRouter = (0, express_1.Router)();
resturantRouter.get('/', (req, res) => {
    const resturants = [];
    res.json({ success: true, resturants }).status(200);
});
resturantRouter.get('/:id', (req, res) => {
    const resturant = {};
    res.json({ success: true, resturant }).status(200);
});
exports.default = resturantRouter;
