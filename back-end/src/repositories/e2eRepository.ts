import { prisma } from "../database.js";

export async function reset() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`
};