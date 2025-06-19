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
exports.registerDeveloper = void 0;
const authDevHelpers_1 = require("../../helpers/authDevHelpers");
const prisma_1 = __importDefault(require("../../prisma"));
const password_1 = require("../../utils/password");
const token_1 = require("../../utils/token");
const registerDeveloper = (params) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authDevHelpers_1.ensureDevNotExists)(params.email);
    const hashed = yield (0, password_1.hashPassword)(params.password);
    const dev = yield prisma_1.default.developer.create({
        data: Object.assign(Object.assign({}, params), { password: hashed }),
    });
    const token = (0, token_1.generateToken)({ id: dev.id, role: "Developer" });
    return { message: "Developer registered", dev, token };
});
exports.registerDeveloper = registerDeveloper;
