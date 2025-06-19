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
exports.ApplicationController = void 0;
const cloudinary_1 = require("../helpers/cloudinary");
const createApplication_1 = require("../services/application/createApplication");
const getApplication_1 = require("../services/application/getApplication");
const prisma_1 = __importDefault(require("../prisma"));
class ApplicationController {
    createApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!req.file)
                    throw { status: 400, message: "Resume file is required" };
                const { jobId, expectedSalary } = req.body;
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(req.file, "JobsDoors", "raw");
                const applicationData = {
                    userId: userId,
                    jobId,
                    expectedSalary,
                    cvUrl: secure_url,
                };
                const application = yield (0, createApplication_1.createApplication)(applicationData);
                res.status(200).json({ application, secure_url });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getUserApplications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 10;
                const application = yield (0, getApplication_1.getUserApplications)({ userId, page, pageSize });
                res.status(200).json(application);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getCompanyApplications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id: jobId } = req.params;
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                const { status } = req.query;
                const filter = {};
                if (status) {
                    filter.status = status;
                }
                const applications = yield prisma_1.default.application.findMany({
                    where: Object.assign(Object.assign({}, filter), { jobId, job: {
                            companyId: companyId,
                        } }),
                    include: {
                        user: {
                            include: {
                                userTest: {
                                    where: {
                                        jobId: jobId,
                                    },
                                    select: {
                                        id: true,
                                        correctAnswers: true,
                                        totalQuestions: true,
                                        scorePercentage: true,
                                        completedAt: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                });
                res.status(200).send({
                    message: "Applications fetched successfully",
                    applications,
                });
            }
            catch (err) {
                console.error(err);
                res.status(404).send(err);
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                const { status } = req.body;
                const application = yield prisma_1.default.application.update({
                    where: {
                        id,
                        job: {
                            companyId,
                        },
                    },
                    data: { status },
                });
                res
                    .status(200)
                    .send({ message: "Status updated successfully", application });
            }
            catch (err) {
                console.error(err);
                res.status(404).send(err);
            }
        });
    }
}
exports.ApplicationController = ApplicationController;
