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
exports.getCompanyOrThrow = exports.ensureCompanyNotExists = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const ensureCompanyNotExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield prisma_1.default.company.findUnique({ where: { email } });
    const isUserRegistered = yield prisma_1.default.user.findUnique({ where: { email } });
    if (emailExists)
        throw { status: 400, message: "Email already registered" };
    if (isUserRegistered)
        throw { status: 400, message: "Email is already associated with a user" };
});
exports.ensureCompanyNotExists = ensureCompanyNotExists;
const getCompanyOrThrow = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!companyId)
        throw { status: 400, message: "Unauthorized" };
    const company = yield prisma_1.default.company.findUnique({ where: { id: companyId } });
    if (!company)
        throw { status: 404, message: "Company not found" };
    return company;
});
exports.getCompanyOrThrow = getCompanyOrThrow;
