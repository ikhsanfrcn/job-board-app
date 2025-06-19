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
exports.loginCompany = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const loginCompany = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield prisma_1.default.company.findUnique({ where: { email } });
    if (!company)
        throw { status: 404, message: "Company not found" };
    if (!company.isVerify)
        throw { status: 403, message: "Account not verified" };
    const valid = yield (0, password_1.comparePassword)(password, company.password);
    if (!valid)
        throw { status: 401, message: "Invalid password" };
    const token = (0, token_1.generateToken)({ id: company.id, role: company.role });
    return { message: "Login successful", data: company, access_token: token };
});
exports.loginCompany = loginCompany;
