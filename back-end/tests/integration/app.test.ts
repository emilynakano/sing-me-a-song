import app from "../../src/app";
import supertest from "supertest";
import { prisma } from "../../src/database.js";

import { generateRecommendation } from "./factories/generateRecommendation.js";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
})

describe("POST /recommendations", () => {
    it("should answer with status code 201 - create recommendation", async () => {
        
    });

    it("should answer with status 422 code - wrong body", () => {

    });

    it("should answer with status code 409 - create recommendation conflict", () => {

    });
})