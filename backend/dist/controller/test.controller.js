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
exports.TestController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class TestController {
    getAllTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tests = yield prisma_1.default.test.findMany();
                res.status(200).send({ tests });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    getTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobId } = req.params;
                const test = yield prisma_1.default.test.findUnique({ where: { jobId } });
                if (!test)
                    throw { message: "No test found!" };
                let questions = [];
                if (typeof test.questions === "string") {
                    questions = test.questions
                        .split("||")
                        .filter(Boolean)
                        .map((q) => {
                        const [question, options, answer] = q.split("|");
                        return {
                            question,
                            options: options ? options.split(";") : [],
                            answer,
                        };
                    });
                }
                else if (Array.isArray(test.questions)) {
                    questions = test.questions;
                }
                const parsedTest = Object.assign(Object.assign({}, test), { questions });
                res.status(200).json(parsedTest);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    createTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobId, title, description, questions } = req.body;
                const existingTest = yield prisma_1.default.test.findUnique({ where: { jobId } });
                if (existingTest)
                    throw { message: "Test already exists for this job!" };
                const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    const test = yield tx.test.create({
                        data: {
                            jobId,
                            title,
                            description,
                            questions,
                            isActive: true
                        },
                    });
                    yield tx.job.update({
                        where: { id: jobId },
                        data: { isTestActive: true }
                    });
                    return test;
                }));
                res.status(201).json({ message: "Test created", test: result });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    submitUserTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, jobId, answers } = req.body;
                if (!userId || !jobId || !Array.isArray(answers)) {
                    console.error("Invalid test submission body:", req.body);
                    throw { message: "Invalid request body" };
                }
                const test = yield prisma_1.default.test.findUnique({
                    where: { jobId },
                });
                if (!test)
                    throw { message: "Test not found" };
                const parsedQuestions = typeof test.questions === "string"
                    ? JSON.parse(test.questions)
                    : test.questions;
                const totalQuestions = parsedQuestions.length;
                let correctAnswers = 0;
                answers.forEach(({ question, selected }) => {
                    var _a;
                    const original = parsedQuestions.find((q) => q.question === question);
                    if (((_a = original === null || original === void 0 ? void 0 : original.answer) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) ===
                        (selected === null || selected === void 0 ? void 0 : selected.trim().toLowerCase())) {
                        correctAnswers++;
                    }
                });
                const scorePercentage = parseFloat(((correctAnswers / totalQuestions) * 100).toFixed(2));
                const savedResult = yield prisma_1.default.userTest.create({
                    data: {
                        userId,
                        jobId,
                        correctAnswers,
                        totalQuestions,
                        scorePercentage,
                    },
                });
                return res.status(201).json({
                    message: "Test submitted successfully",
                    result: savedResult,
                });
            }
            catch (err) {
                console.error(err);
                return res.status(400).json(err);
            }
        });
    }
    activateTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { jobId } = req.params;
                const companyId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const job = yield prisma_1.default.job.findFirst({
                    where: { id: jobId, companyId: companyId },
                    include: { test: true },
                });
                if (!job)
                    throw { message: "Job not found!" };
                if ((_b = job.test) === null || _b === void 0 ? void 0 : _b.isActive)
                    throw { message: "Test already active" };
                yield prisma_1.default.test.update({
                    where: { jobId: jobId },
                    data: { isActive: true },
                });
                yield prisma_1.default.job.update({
                    where: { id: jobId },
                    data: { isTestActive: true },
                });
                return res.status(200).send({ message: "Test activated successfully" });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    deactivateTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { jobId } = req.params;
                const companyId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const job = yield prisma_1.default.job.findFirst({
                    where: { id: jobId, companyId: companyId },
                    include: { test: true },
                });
                if (!job)
                    throw { message: "Job not found!" };
                if (!job.test)
                    throw { message: "No test found for this job!" };
                if (!job.test.isActive)
                    throw { message: "Test is already inactive" };
                yield prisma_1.default.test.update({
                    where: { jobId: jobId },
                    data: { isActive: false },
                });
                yield prisma_1.default.job.update({
                    where: { id: jobId },
                    data: { isTestActive: false },
                });
                return res.status(200).send({ message: "Test deactivate successfully" });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
}
exports.TestController = TestController;
