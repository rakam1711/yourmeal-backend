"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "test123";
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    orders: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Orders",
        },
    ],
    address: {
        type: String,
        required: false,
    },
});
userSchema.pre("save", async function (next) {
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
userSchema.methods.verifyPassword = async function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
userSchema.methods.getSignedToken = function () {
    return jsonwebtoken_1.default.sign({ userid: this._id, role: this.role }, JWT_SECRET_KEY, {
        expiresIn: "3d",
    });
};
const Users = mongoose_1.default.model("Users", userSchema);
exports.default = Users;
