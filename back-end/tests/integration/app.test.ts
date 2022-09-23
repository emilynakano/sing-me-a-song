import app from "../../src/app";
import supertest from "supertest";
import { prisma } from "../../src/database.js";

import { generateRecommendation, CreateRecommendationData, insertRecommendation } from "./factories/generateRecommendation.js";

const agent = supertest(app);

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
})

describe("POST /recommendations", () => {
    it("should answer with status code 201 - create recommendation", async () => {
        const recommendation = await generateRecommendation();
        
        const result = await agent.post("/recommendations").send(recommendation);
     
        expect(result.status).toBe(201);
    });

    it("should answer with status 422 code - wrong body", async () => {
        const recommendation = {};
        
        const result = await agent.post("/recommendations").send(recommendation);
    
        expect(result.status).toBe(422);
    });

    it("should answer with status code 409 - create recommendation conflict", async () => {
        const recommendation = await generateRecommendation();
        await insertRecommendation(recommendation);

        const result = await agent.post("/recommendations").send(recommendation);
        
        expect(result.status).toBe(409);
    });
});

describe("GET /recommendations", () => {
    it("should answer with status code 200 and not null array", async () => {
        const recommendation = await generateRecommendation();
        await insertRecommendation(recommendation);

        const result = await agent.get("/recommendations");
     
        expect(result.status).toBe(200);
        expect(result.body).toHaveLength(1);
    });

});