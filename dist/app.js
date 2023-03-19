"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/test";
mongoose_1.default.connect(DATABASE_URL).then(() => console.log('connection established'));
app.use("/", routes_1.default);
const server = http_1.default.createServer(app);
server.listen("3000", () => {
    console.log("server established");
});
