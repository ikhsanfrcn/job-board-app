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
exports.userPasswordChange = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const validatePassword_1 = require("../../utils/validatePassword");
const authHelpers_1 = require("../../helpers/authHelpers");
const userPasswordChange = (userId, currentPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validatePassword_1.validatePasswordStrength)(newPassword);
    const user = yield (0, authHelpers_1.getUserOrThrow)(userId);
    const passwordMatch = yield (0, password_1.comparePassword)(currentPassword, user.password);
    if (!passwordMatch) {
        throw new Error('The old password you entered is incorrect');
    }
    const hashed = yield (0, password_1.hashPassword)(newPassword);
    yield prisma_1.default.user.update({
        where: { id: user.id },
        data: { password: hashed },
    });
    return { message: "Change password success" };
});
exports.userPasswordChange = userPasswordChange;
