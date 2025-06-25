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
exports.verifyUserAccount = void 0;
const authHelpers_1 = require("../../helpers/authHelpers");
const prisma_1 = __importDefault(require("../../prisma"));
const verifyUserAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, authHelpers_1.getUserOrThrow)(userId);
    if (user.isVerify)
        throw { status: 400, message: "Already verified" };
    yield prisma_1.default.user.update({ where: { id: userId }, data: { isVerify: true } });
    return { message: "Verification successful" };
});
exports.verifyUserAccount = verifyUserAccount;
