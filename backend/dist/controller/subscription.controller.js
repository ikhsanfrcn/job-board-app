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
exports.SubscriptionController = void 0;
const createSubscription_1 = require("../services/subscription/createSubscription");
const getSubscription_1 = require("../services/subscription/getSubscription");
const subscriptionValidation_1 = require("../validation/subscriptionValidation");
const updateSubscription_1 = require("../services/subscription/updateSubscription");
const deleteSusbcription_1 = require("../services/subscription/deleteSusbcription");
class SubscriptionController {
    createSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const validatedData = yield subscriptionValidation_1.subscriptionSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                if (!userId)
                    throw { status: 400, message: "Unauthorized" };
                const result = yield (0, createSubscription_1.createSubscription)(userId, validatedData);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(error.message || 500).json({ message: error.message });
            }
        });
    }
    getSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield (0, getSubscription_1.getSubscription)();
                res.status(200).json(subscriptions);
            }
            catch (error) {
                res.status(error.message || 500).json({ message: error.message });
            }
        });
    }
    updateSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw { status: 400, message: "Unauthorized" };
                const { id } = req.params;
                const validatedData = yield subscriptionValidation_1.subscriptionSchema.validate(req.body, {
                    abortEarly: false,
                    stripUnknown: true,
                });
                const result = yield (0, updateSubscription_1.updateSubscription)(id, validatedData);
                res.status(200).json(result);
            }
            catch (error) {
                if (error.name === "ValidationError") {
                    res.status(400).json({
                        message: "Validation failed",
                        errors: error.errors,
                    });
                    return;
                }
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    deleteSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { id } = req.params;
                if (!userId)
                    throw { status: 400, message: "Unauthorized" };
                const job = yield (0, deleteSusbcription_1.deleteSubscription)(id);
                res.status(200).json(job);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.SubscriptionController = SubscriptionController;
