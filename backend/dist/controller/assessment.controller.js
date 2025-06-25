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
exports.SkillAssessmentController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const cloudinary_1 = require("../helpers/cloudinary");
const getUserAssessment_1 = require("../services/assessment/getUserAssessment");
class SkillAssessmentController {
    createAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file)
                    throw { message: "Image Empty!" };
                const { title, description, category, questions } = req.body;
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(req.file, "jobsdoors", "image");
                const parsedQUestions = JSON.parse(questions);
                const newAssessment = yield prisma_1.default.skillAssessmentTemplate.create({
                    data: {
                        title,
                        description,
                        category,
                        questions: parsedQUestions,
                        badgeImage: secure_url,
                    },
                });
                res
                    .status(201)
                    .json({ message: "Skill assessment created", newAssessment });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    getAllAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 5;
                const skip = (page - 1) * limit;
                const assessments = yield prisma_1.default.skillAssessmentTemplate.findMany({
                    skip,
                    take: limit,
                    orderBy: { createdAt: "desc" },
                });
                const totalAssessments = yield prisma_1.default.skillAssessmentTemplate.count();
                res.status(200).json({
                    assessments,
                    currentPage: page,
                    totalPages: Math.ceil(totalAssessments / limit),
                });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    getAssessmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const assessment = yield prisma_1.default.skillAssessmentTemplate.findUnique({
                    where: { id },
                });
                if (!assessment)
                    throw { message: "Assessment template not found!" };
                res.status(200).json(assessment);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    editAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, category, questions } = req.body;
                let badgeImagePath = undefined;
                if (req.file) {
                    const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(req.file, "jobsdoors", "image");
                    badgeImagePath = secure_url;
                }
                const existingAssessment = yield prisma_1.default.skillAssessmentTemplate.findUnique({ where: { id } });
                if (!existingAssessment)
                    throw { message: "Assessment not found" };
                const updateData = {
                    title,
                    description,
                    category,
                    questions: JSON.parse(questions),
                    updatedAt: new Date(),
                };
                if (badgeImagePath) {
                    updateData.badgeImage = badgeImagePath;
                }
                const updatedAssessment = yield prisma_1.default.skillAssessmentTemplate.update({
                    where: { id },
                    data: updateData,
                });
                res.status(200).json({
                    message: "Assessment updated successfully",
                    updatedAssessment,
                });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    deleteAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const existingAssessment = yield prisma_1.default.skillAssessmentTemplate.findUnique({ where: { id } });
                if (!existingAssessment)
                    throw { message: "Assessment not found" };
                yield prisma_1.default.skillAssessmentTemplate.delete({ where: { id } });
                res.status(200).json({ message: "Assessment deleted successfully" });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    getAssessmentByTemplateId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { templateId } = req.params;
                const assessment = yield prisma_1.default.skillAssessmentTemplate.findUnique({
                    where: { id: templateId },
                });
                if (!assessment)
                    throw { message: "Assessment template not found!" };
                res.status(200).json(assessment);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    startAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { templateId } = req.params;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw { message: "User not found!" };
                const existingSession = yield prisma_1.default.assessmentSession.findFirst({
                    where: {
                        userId,
                        templateId,
                        isActive: true,
                        expiresAt: { gt: new Date() },
                    },
                });
                if (existingSession) {
                    res.status(200).json({
                        sessionToken: existingSession.sessionToken,
                        timeRemaining: existingSession.timeRemaining,
                        currentQuestionIndex: existingSession.currentQuestionIndex,
                        answers: existingSession.answers,
                    });
                    return;
                }
                const template = yield prisma_1.default.skillAssessmentTemplate.findUnique({
                    where: { id: templateId },
                });
                if (!template)
                    throw { message: "Assessment not found!" };
                const sessionToken = (0, uuid_1.v4)();
                const expiresAt = new Date(Date.now() + template.timeLimit * 1000);
                const newSession = yield prisma_1.default.assessmentSession.create({
                    data: {
                        userId,
                        templateId,
                        sessionToken,
                        timeRemaining: template.timeLimit,
                        currentQuestionIndex: 0,
                        answers: {},
                        expiresAt,
                        isActive: true,
                    },
                });
                res.status(201).json({
                    sessionToken: newSession.sessionToken,
                    timeRemaining: newSession.timeRemaining,
                    currentQuestionIndex: 0,
                    answers: {},
                });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    saveProgress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { sessionToken, answers, currentQuestionIndex, timeRemaining } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const session = yield prisma_1.default.assessmentSession.findUnique({
                    where: { sessionToken },
                });
                if (!session || !session.isActive || session.userId !== userId)
                    throw { message: "Invalid session!" };
                const updateSession = yield prisma_1.default.assessmentSession.update({
                    where: { sessionToken },
                    data: {
                        answers,
                        currentQuestionIndex,
                        timeRemaining,
                        updatedAt: new Date(),
                    },
                });
                res.status(201).json(updateSession);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    submitAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { sessionToken, answers } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const session = yield prisma_1.default.assessmentSession.findUnique({
                    where: { sessionToken },
                    include: { template: true },
                });
                if (!session || !session.isActive || session.userId !== userId)
                    throw { message: "Invalid session!" };
                let questions = session.template.questions;
                if (typeof questions === "string") {
                    try {
                        questions = JSON.parse(questions);
                    }
                    catch (e) {
                        throw { message: "Failed to parse questions." };
                    }
                }
                if (!Array.isArray(questions)) {
                    throw { message: "Questions are not in array format." };
                }
                const correctAnswers = questions.filter((q, i) => q.answer === answers[i]).length;
                const score = Math.round((correctAnswers / questions.length) * 100);
                const isPassed = score >= session.template.passingScore;
                const timeSpent = session.template.timeLimit - session.timeRemaining;
                const result = yield prisma_1.default.skillAssessment.create({
                    data: {
                        userId,
                        templateId: session.templateId,
                        score,
                        totalPoints: session.template.totalPoints,
                        isPassed,
                        timeSpent,
                        answers,
                        startedAt: session.createdAt,
                        completedAt: new Date(),
                    },
                });
                yield prisma_1.default.assessmentSession.update({
                    where: { sessionToken },
                    data: { isActive: false },
                });
                res.status(201).json({
                    score,
                    isPassed,
                    correctAnswers,
                    totalQuestions: questions.length,
                    timeSpent,
                    result,
                });
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    }
    getUserAssessments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId)
                    throw { message: "Unauthorized" };
                const { title, isPassed, sortBy = "createdAt", sortOrder = "asc", page = 1, limit = 10, } = req.query;
                const assessments = yield (0, getUserAssessment_1.getUserAssessments)({
                    userId,
                    title: title,
                    isPassed: isPassed === "true" ? true : isPassed === "false" ? false : undefined,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    page: parseInt(page),
                    limit: parseInt(limit),
                });
                res.status(200).json(assessments);
            }
            catch (err) {
                res.status(404).send(err);
            }
        });
    }
    generatePdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const assessmentId = req.params.id;
            const BROWSERLESS_WS = `wss://production-sfo.browserless.io/chromium?token=${process.env.BROWSERLESS_KEY}&blockAds=true`;
            try {
                const assessment = yield prisma_1.default.skillAssessment.findUnique({
                    where: { id: assessmentId },
                    include: {
                        template: true,
                        user: true,
                    },
                });
                if (!assessment || assessment.userId !== userId) {
                    res
                        .status(404)
                        .json({ message: "Assessment not found or unauthorized" });
                    return;
                }
                const templatePath = path_1.default.join(__dirname, "..", "templates", "certificateGenerate.ejs");
                const html = yield ejs_1.default.renderFile(templatePath, {
                    userName: `${assessment.user.firstName} ${assessment.user.lastName}`,
                    assessmentTitle: assessment.template.title,
                    score: assessment.score,
                    totalPoints: assessment.totalPoints,
                    completedAt: assessment.completedAt,
                    certificateId: assessmentId,
                    domain: process.env.BASE_URL_FRONTEND,
                });
                let browser;
                try {
                    browser = yield puppeteer_core_1.default.connect({
                        browserWSEndpoint: BROWSERLESS_WS,
                    });
                }
                catch (browserErr) {
                    console.error("Failed to connect to Browserless:", browserErr);
                    res.status(502).json({
                        message: "Failed to connect to Browserless. Please ensure API token is valid and the service is available.",
                    });
                    return;
                }
                try {
                    const page = yield browser.newPage();
                    yield page.setContent(html, { waitUntil: "networkidle0" });
                    const pdfBuffer = yield page.pdf({
                        format: "a4",
                        landscape: true,
                        printBackground: true,
                    });
                    yield browser.close();
                    res.set({
                        "Content-Type": "application/pdf",
                        "Content-Disposition": `attachment; filename="${assessment.user.username}_certificate.pdf"`,
                        "Content-Length": pdfBuffer.length,
                    });
                    res.status(200).send(pdfBuffer);
                    return;
                }
                catch (renderErr) {
                    console.error("PDF render error:", renderErr);
                    yield browser.close();
                    res.status(500).json({
                        message: "Failed to create PDF file.",
                    });
                    return;
                }
            }
            catch (err) {
                console.error("Unexpected server error:", err);
                res.status(500).json({
                    message: "An unexpected server error occurred.",
                });
            }
        });
    }
    verifyAssessment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const assessmentId = req.params.id;
            try {
                const assessment = yield prisma_1.default.skillAssessment.findUnique({
                    where: { id: assessmentId },
                    include: {
                        template: { select: { title: true, category: true } },
                        user: {
                            select: {
                                email: true,
                                username: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                });
                if (!assessment) {
                    res.status(404).send({ message: "Assessment not found or invalid" });
                    return;
                }
                res.status(200).send({
                    message: "Assessment verified successfully",
                    assessment,
                });
            }
            catch (err) {
                console.log(err);
                res.status(404).send(err);
            }
        });
    }
    getUserPassedBadges(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const allTemplates = yield prisma_1.default.skillAssessmentTemplate.findMany();
                const passedAssessments = yield prisma_1.default.skillAssessment.findMany({
                    where: {
                        userId,
                        isPassed: true,
                    },
                    include: {
                        template: true,
                    },
                    orderBy: {
                        completedAt: "desc",
                    },
                });
                const uniqueBadges = passedAssessments.reduce((acc, assessment) => {
                    var _a, _b;
                    const existingBadge = acc.find((item) => item.templateId === assessment.template.id);
                    if (!existingBadge) {
                        acc.push({
                            templateId: assessment.template.id,
                            title: assessment.template.title,
                            category: assessment.template.category,
                            badgeImage: (_a = assessment.template.badgeImage) !== null && _a !== void 0 ? _a : "",
                            earnedAt: (_b = assessment.completedAt) !== null && _b !== void 0 ? _b : new Date(),
                            score: assessment.score,
                            totalPoints: assessment.totalPoints,
                        });
                    }
                    return acc;
                }, []);
                res.status(200).send({
                    message: "User badges fetched successfully",
                    badges: uniqueBadges,
                    totalBadges: allTemplates.length,
                });
            }
            catch (err) {
                res.status(500).send({
                    message: "Error fetching user badges",
                    error: err,
                });
            }
        });
    }
}
exports.SkillAssessmentController = SkillAssessmentController;
