import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";
import { prisma } from "../../../src/database";

export type CreateRecommendationData = Omit<Recommendation, "id" | "score">;

export async function generateRecommendation() {
    return {
        name: faker.music.songName(),
        youtubeLink: `https://www.youtube.com/${faker.random.alphaNumeric(40)}`
    }
}

export async function insertRecommendation(recommendation: CreateRecommendationData) {
    await prisma.recommendation.create({
        data: recommendation
    })
}