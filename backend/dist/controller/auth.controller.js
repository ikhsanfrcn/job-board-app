"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const registerUser_1 = require("../services/auth/registerUser");
const verifyUser_1 = require("../services/auth/verifyUser");
const loginUser_1 = require("../services/auth/loginUser");
const googleAuth_1 = require("../services/auth/googleAuth");
const resetPassword_1 = require("../services/auth/resetPassword");
const requestReset_1 = require("../services/auth/requestReset");
const authValidation_1 = require("../validation/authValidation");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = yield authValidation_1.registerUserSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const user = yield (0, registerUser_1.registerUser)(validatedData);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield (0, verifyUser_1.verifyUserAccount)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const result = yield (0, loginUser_1.loginUser)(username, password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    googleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, username, password, avatar } = req.body;
                const result = yield (0, googleAuth_1.googleAuth)({ email, username, password, avatar });
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield (0, requestReset_1.requestUserPasswordReset)(email);
                res.status(200).json(result);
            }
            catch (error) {
                res
                    .status(error.status || 500)
                    .json({ message: error.message || "Internal server error" });
            }
        });
    }
    passwordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization;
                const { newPassword } = req.body;
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    res.status(400).json({ message: "Authorization token is missing or invalid" });
                    return;
                }
                const token = authHeader.split(" ")[1];
                const result = yield (0, resetPassword_1.userPasswordReset)(token, newPassword);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message || "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
