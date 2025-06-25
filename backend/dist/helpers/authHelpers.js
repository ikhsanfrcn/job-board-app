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
exports.getUserOrThrow = exports.ensureUserNotExists = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const ensureUserNotExists = (email, username) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield prisma_1.default.user.findUnique({ where: { email } });
    const usernameExists = yield prisma_1.default.user.findUnique({ where: { username } });
    const isCompanyRegistered = yield prisma_1.default.company.findUnique({ where: { email } });
    if (emailExists || usernameExists)
        throw { status: 400, message: "Username / Email already registered" };
    if (isCompanyRegistered)
        throw { status: 400, message: "Email is already registered to a company" };
});
exports.ensureUserNotExists = ensureUserNotExists;
const getUserOrThrow = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw { status: 400, message: "Unauthorized" };
    const user = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw { status: 404, message: "User not found" };
    return user;
});
exports.getUserOrThrow = getUserOrThrow;
