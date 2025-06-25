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
exports.googleAuth = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const googleAuth = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = params;
    let user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        const hashed = yield (0, password_1.hashPassword)(params.password);
        user = yield prisma_1.default.user.create({
            data: Object.assign(Object.assign({}, params), { password: hashed, isVerify: true }),
        });
    }
    const access_token = (0, token_1.generateToken)({ id: user.id, role: "User" });
    return { message: "Google authentication successful", data: user, access_token };
});
exports.googleAuth = googleAuth;
