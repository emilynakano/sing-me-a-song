import { faker } from "@faker-js/faker";

export async function generateRecommendation() {
    return {
        name: faker.music.songName(),
        youtubeLink: `https://www.youtube.com/${faker.random.alphaNumeric(40)}`
    }
}