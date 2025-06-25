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
const mailer_1 = require("../utils/mailer");
class ApplicationController {
    createApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!req.file)
                    throw { status: 400, message: "Resume file is required" };
                const { jobId, expectedSalary } = req.body;
                const parsedSalary = parseInt(expectedSalary, 10);
                if (isNaN(parsedSalary)) {
                    throw { status: 400, message: "Expected salary must be a number" };
                }
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(req.file, "JobsDoors", "raw");
                const applicationData = {
                    userId: userId,
                    jobId,
                    expectedSalary: parsedSalary,
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
                const { title, company, status, sortBy = "createdAt", sortOrder = "asc", page = "1", limit = "10", } = req.query;
                const pageNumber = parseInt(page) || 1;
                const limitNumber = parseInt(limit) || 10;
                const application = yield (0, getApplication_1.getUserApplications)({
                    userId,
                    title: title,
                    company: company,
                    status: status,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    page: pageNumber,
                    limit: limitNumber,
                });
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
                const { userFirstName, usereducation, expectedSalary, status, age, sortBy = "createdAt", sortOrder = "asc", page = "1", limit = "10", } = req.query;
                if (!companyId) {
                    res.status(400).json({ message: "Company ID is missing" });
                    return;
                }
                const pageNumber = parseInt(page, 10);
                const limitNumber = parseInt(limit, 10);
                const { applications, total } = yield (0, getApplication_1.getCompanyApplicationsService)({
                    jobId,
                    companyId,
                    status: status,
                    userFirstName: userFirstName,
                    usereducation: usereducation,
                    expectedSalary: expectedSalary
                        ? parseInt(expectedSalary, 10)
                        : undefined,
                    age: age ? parseInt(age, 10) : undefined,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    page: pageNumber,
                    limit: limitNumber,
                });
                res.status(200).send({
                    message: "Applications fetched successfully",
                    applications,
                    total,
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages: Math.ceil(total / limitNumber),
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).send({
                    message: "Failed to fetch applications",
                    error: err,
                });
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                const companyId = (_a = req.company) === null || _a === void 0 ? void 0 : _a.id;
                const { status, reason } = req.body;
                const existingApplication = yield prisma_1.default.application.findUnique({
                    where: { id },
                    include: {
                        job: {
                            include: {
                                company: true,
                            },
                        },
                    },
                });
                if (!existingApplication) {
                    res.status(404).json({ message: "Application not found" });
                    return;
                }
                if (existingApplication.job.company.id !== companyId) {
                    res.status(403).json({ message: "Unauthorized" });
                    return;
                }
                if (status === "REJECTED" && !reason) {
                    res.status(400).json({ message: "Reason is required for rejection" });
                    return;
                }
                const updatedApplication = yield prisma_1.default.application.update({
                    where: { id },
                    data: { status },
                    include: {
                        user: true,
                        job: {
                            include: { company: true },
                        },
                    },
                });
                if (["OFFERED", "ACCEPTED", "REJECTED"].includes(status)) {
                    const email = updatedApplication.user.email;
                    const subject = `Your application has been ${status.toLowerCase()}`;
                    const templateName = status.toLowerCase();
                    const templateData = {
                        name: updatedApplication.user.username,
                        jobTitle: updatedApplication.job.title,
                        companyName: updatedApplication.job.company.name,
                    };
                    if (status === "REJECTED") {
                        templateData.reason = reason || "No reason provided";
                    }
                    yield (0, mailer_1.sendApplicationStatusEmail)({
                        email,
                        subject,
                        templateName,
                        templateData,
                    });
                }
                res.status(200).json({
                    message: "Status updated successfully",
                    application: updatedApplication,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: "An error occurred", error: err });
            }
        });
    }
}
exports.ApplicationController = ApplicationController;
