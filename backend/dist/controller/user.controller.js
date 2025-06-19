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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const getUserProfile_1 = __importDefault(require("../services/user/getUserProfile"));
const updateUser_1 = __importDefault(require("../services/user/updateUser"));
const getUserByEmail_1 = __importDefault(require("../services/user/getUserByEmail"));
const updateAvatar_1 = __importDefault(require("../services/user/updateAvatar"));
const userValidation_1 = require("../validation/userValidation");
class UserController {
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield (0, getUserProfile_1.default)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                res.status(200).send({ message: "User fetched successfully", user });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const validatedData = yield userValidation_1.updateUserSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const updatedUser = yield (0, updateUser_1.default)(userId, validatedData);
                res
                    .status(200)
                    .send({ message: "User updated successfully", user: updatedUser });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, getUserByEmail_1.default)(req.params.email);
                res.status(200).send(user);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    updateAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const url = yield (0, updateAvatar_1.default)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.file);
                res
                    .status(200)
                    .send({ message: "Avatar updated successfully", secure_url: url });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
