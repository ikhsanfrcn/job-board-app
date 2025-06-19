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
exports.SubscriberController = void 0;
const createSubs_1 = require("../services/subscriber/createSubs");
const getSubsById_1 = require("../services/subscriber/getSubsById");
const getSubsByUser_1 = require("../services/subscriber/getSubsByUser");
const canclePayment_1 = require("../services/transaction/canclePayment");
const reminder_1 = require("../services/subscriber/reminder");
const checkExpired_1 = require("../services/subscriber/checkExpired");
class SubscriberController {
    createSubscriber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { type } = req.body;
                if (!userId)
                    throw { status: 400, message: "Unauthorized" };
                if (!type)
                    throw { status: 400, message: "`type` field is required" };
                const result = yield (0, createSubs_1.createSubscriber)({ userId, type });
                res.status(201).json({
                    message: "Subscriber created",
                    result,
                });
            }
            catch (error) {
                console.log(error);
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getSubscriberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const subscriber = yield (0, getSubsById_1.getSubscriberById)(id);
                if (!subscriber)
                    throw {
                        status: 400,
                        message: "Subscriber not found",
                    };
                res.json(subscriber);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getSubscriberByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw { status: 400, message: "Unauthorized" };
                const subscriber = yield (0, getSubsByUser_1.getSubscriberByUser)(userId);
                res.status(200).json(subscriber);
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
    sendReminder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, reminder_1.sendSubscriptionRenewalReminders)();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    checkExpire(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, checkExpired_1.checkAndExpireSubscribers)();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.SubscriberController = SubscriberController;
