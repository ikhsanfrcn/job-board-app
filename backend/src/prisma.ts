import { PrismaClient } from "../prisma/generated/prisma";

export default new PrismaClient({ log: ["error", "info", "query", "warn"] });
