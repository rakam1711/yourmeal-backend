"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
const resturant_route_1 = __importDefault(require("./resturant.route"));
const user_route_1 = __importDefault(require("./user.route"));
const protect_1 = __importDefault(require("../middlewares/protect"));
const router = express_1.default.Router();
router.use('/auth', auth_route_1.default);
router.use('/resturant', resturant_route_1.default);
router.use('/user', protect_1.default, user_route_1.default);
exports.default = router;
