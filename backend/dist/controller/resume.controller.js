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
exports.ResumeController = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const puppeteer_1 = __importDefault(require("puppeteer"));
class ResumeController {
    createResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).send({ error: "Unauthorized" });
                return;
            }
            const { summary, workExperience = [], education = [], leadership = [], additional = [], } = req.body;
            try {
                const resume = yield prisma_1.default.userResume.create({
                    data: {
                        summary,
                        user: { connect: { id: userId } },
                        workExperience: {
                            create: workExperience.map((job) => ({
                                company: job.company,
                                description: job.description,
                                employmentType: job.employmentType,
                                startDate: job.startDate,
                                endDate: job.endDate ? job.endDate : null,
                                jobdesc: {
                                    connectOrCreate: {
                                        where: { name: job.jobdesc.name },
                                        create: { name: job.jobdesc.name },
                                    },
                                },
                            })),
                        },
                        education: {
                            create: education.map((edu) => ({
                                schoolName: edu.schoolName,
                                degree: edu.degree,
                                fieldOfStudy: edu.fieldOfStudy,
                                startDate: edu.startDate,
                                endDate: edu.endDate ? edu.endDate : null,
                            })),
                        },
                        leadership: {
                            create: leadership.map((lead) => ({
                                organization: lead.organization,
                                role: lead.role,
                                description: lead.description,
                                startDate: lead.startDate,
                                endDate: lead.endDate,
                            })),
                        },
                        additional: {
                            create: additional.map((add) => ({
                                category: add.category,
                                items: add.items,
                                description: add.description,
                            })),
                        },
                    },
                    include: {
                        workExperience: {
                            include: {
                                jobdesc: true,
                            },
                        },
                        education: true,
                        leadership: true,
                        additional: true,
                    },
                });
                res
                    .status(200)
                    .send({ message: "Resume created successfully", resume });
            }
            catch (err) {
                console.error(err);
                res.status(400).send(err);
            }
        });
    }
    getUserResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            try {
                const resume = yield prisma_1.default.userResume.findUnique({
                    where: { userId },
                    include: {
                        workExperience: {
                            include: {
                                jobdesc: true,
                            },
                        },
                        education: true,
                        leadership: true,
                        additional: true,
                    },
                });
                res
                    .status(200)
                    .send({ message: "Resume fetched successfully", resume });
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        });
    }
    updateResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { summary, workExperience = [], education = [], leadership = [], additional = [], } = req.body;
            try {
                const resume = yield prisma_1.default.userResume.update({
                    where: {
                        userId,
                    },
                    data: {
                        summary,
                        workExperience: {
                            deleteMany: {},
                            create: workExperience.map((job) => {
                                var _a;
                                return ({
                                    company: job.company,
                                    description: job.description,
                                    employmentType: job.employmentType,
                                    startDate: job.startDate,
                                    endDate: (_a = job.endDate) !== null && _a !== void 0 ? _a : null,
                                    jobdesc: {
                                        connectOrCreate: {
                                            where: { name: job.jobdesc.name },
                                            create: { name: job.jobdesc.name },
                                        },
                                    },
                                });
                            }),
                        },
                        education: {
                            deleteMany: {},
                            create: education.map((edu) => {
                                var _a;
                                return ({
                                    schoolName: edu.schoolName,
                                    degree: edu.degree,
                                    fieldOfStudy: edu.fieldOfStudy,
                                    startDate: edu.startDate,
                                    endDate: (_a = edu.endDate) !== null && _a !== void 0 ? _a : null,
                                });
                            }),
                        },
                        leadership: {
                            deleteMany: {},
                            create: leadership.map((lead) => ({
                                organization: lead.organization,
                                role: lead.role,
                                description: lead.description,
                                startDate: lead.startDate,
                                endDate: lead.endDate,
                            })),
                        },
                        additional: {
                            deleteMany: {},
                            create: additional.map((add) => ({
                                category: add.category,
                                items: add.items,
                                description: add.description,
                            })),
                        },
                    },
                    include: {
                        workExperience: {
                            include: {
                                jobdesc: true,
                            },
                        },
                        education: true,
                        leadership: true,
                        additional: true,
                    },
                });
                res.status(200).send({
                    message: "Resume updated successfully",
                    resume,
                });
            }
            catch (err) {
                console.error(err);
                res.status(400).send(err);
            }
        });
    }
    generatePdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            try {
                const resume = yield prisma_1.default.userResume.findUnique({
                    where: { userId },
                    include: {
                        workExperience: { include: { jobdesc: true } },
                        education: true,
                        leadership: true,
                        additional: true,
                        user: true,
                    },
                });
                if (!resume) {
                    res.status(404).send({ message: "Resume not found" });
                    return;
                }
                const templatePath = path_1.default.join(__dirname, "..", "templates", "cvGenerate.ejs");
                const html = yield ejs_1.default.renderFile(templatePath, {
                    resume,
                    user: resume.user,
                });
                const browser = yield puppeteer_1.default.launch({
                    headless: true,
                });
                const page = yield browser.newPage();
                yield page.setContent(html, {
                    waitUntil: "networkidle0",
                });
                const pdfBuffer = yield page.pdf({
                    format: "A4",
                    printBackground: true,
                });
                yield browser.close();
                res.set({
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "attachment; filename=resume.pdf",
                    "Content-Length": pdfBuffer.length,
                });
                res.status(200).send(pdfBuffer);
                return;
            }
            catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        });
    }
}
exports.ResumeController = ResumeController;
