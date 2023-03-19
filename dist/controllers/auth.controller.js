"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const database_1 = require("../database");
exports.default = async (req) => {
    const { email, password } = req.body;
    const errors = {};
    const data = {};
    block: try {
        const user = await database_1.Users.findOne({ email });
        if (!user) {
            errors.message = "User not found";
            break block;
        }
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            errors.message = "Email and Password do not match";
            break block;
        }
        const token = user.getSignedToken();
        if (!token) {
            errors.message = "Unable to login the user. Please contact the server admin";
            break block;
        }
        data.token = token;
    }
    catch (error) {
        errors.message = error;
        console.log(error);
    }
    finally {
        return {
            success: Object.keys(errors).length < 1,
            errors,
            data
        };
    }
};
const registerController = async (req) => {
    const { email, password, firstname, lastname, phone } = req.body;
    const errors = {};
    const data = {};
    block: try {
        const checkUserExists = await database_1.Users.findOne({ email });
        if (checkUserExists) {
            errors.message = "Email already in use";
            break block;
        }
        const user = await database_1.Users.create({ email, password, firstname, lastname, phone });
        const token = user.getSignedToken();
        data.token = token;
    }
    catch (error) {
        errors.message = error;
        console.error(error);
    }
    finally {
        return {
            success: Object.keys(errors).length < 1,
            errors,
            data
        };
    }
};
exports.registerController = registerController;
