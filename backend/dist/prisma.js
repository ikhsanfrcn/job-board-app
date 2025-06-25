"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma/generated/prisma");
exports.default = new prisma_1.PrismaClient({ log: ["error", "info", "query", "warn"] });
