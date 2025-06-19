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
exports.TransactionController = void 0;
const invoiceUpdate_1 = require("../services/transaction/invoiceUpdate");
const canclePayment_1 = require("../services/transaction/canclePayment");
const createTransaction_1 = require("../services/transaction/createTransaction");
const createSubs_1 = require("../services/subscriber/createSubs");
const getTransactionById_1 = require("../services/transaction/getTransactionById");
class TransactionController {
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { type, amount } = req.body;
                if (!userId)
                    throw { status: 400, message: "Unauthorized" };
                if (!type)
                    throw { status: 400, message: "`type` field is required" };
                const subscriber = yield (0, createSubs_1.createSubscriber)({ userId, type });
                const transaction = yield (0, createTransaction_1.createTransaction)({ userId, type, amount });
                res.status(201).json({
                    message: "Transaction created",
                    transaction,
                    subscriber
                });
            }
            catch (error) {
                console.log(error);
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    handleWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, external_id } = req.body;
                if (!status || !external_id)
                    throw {
                        status: 400,
                        message: "`status and external_id` field is required",
                    };
                yield (0, invoiceUpdate_1.handleInvoiceStatusUpdate)(status, external_id);
                res.status(200).json({ message: "Success" });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getTransactionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const transaction = yield (0, getTransactionById_1.getTransactionById)(id);
                if (!transaction)
                    throw {
                        status: 400,
                        message: "Transaction not found",
                    };
                res.json(transaction);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    cancelPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const result = yield (0, canclePayment_1.cancelPayment)(id);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.TransactionController = TransactionController;
