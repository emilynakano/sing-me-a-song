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
        
        const recommendationCount = await prisma.recommendation.count();

        expect(result.status).toBe(201);
        expect(recommendationCount).toEqual(1)
    });

    it("should answer with status 422 code - wrong body", async () => {
        const recommendation = {};
        
        const result = await agent.post("/recommendations").send(recommendation);
    
        const recommendationCount = await prisma.recommendation.count();

        expect(result.status).toBe(422);
        expect(recommendationCount).toEqual(0)
    });

    it("should answer with status code 409 - create recommendation conflict", async () => {
        const recommendation = await generateRecommendation();
        await insertRecommendation(recommendation);

        const result = await agent.post("/recommendations").send(recommendation);
        
        const recommendationCount = await prisma.recommendation.count();

        expect(result.status).toBe(409);
        expect(recommendationCount).toEqual(1)
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

describe("GET /recommendations/random", () => {
    it("should answer with status code 200 and an object", async () => {
        const recommendation = await generateRecommendation();
        await insertRecommendation(recommendation);

        const result = await agent.get("/recommendations/random");
     
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

});