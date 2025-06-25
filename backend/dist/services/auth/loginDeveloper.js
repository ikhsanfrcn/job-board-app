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
exports.loginDeveloper = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const loginDeveloper = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const dev = yield prisma_1.default.developer.findUnique({ where: { email } });
    if (!dev)
        throw { status: 404, message: "Developer not found" };
    const valid = yield (0, password_1.comparePassword)(password, dev.password);
    if (!valid)
        throw { status: 401, message: "Invalid password" };
    const token = (0, token_1.generateToken)({ id: dev.id, role: dev.role });
    return { message: "Login successful", data: dev, access_token: token };
});
exports.loginDeveloper = loginDeveloper;
