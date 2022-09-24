import { jest } from "@jest/globals";

import { faker } from "@faker-js/faker";

import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

const recommendation = {
    name: faker.music.songName(),
    youtubeLink: `https://www.youtube.com/${faker.random.alphaNumeric(40)}`
}

describe("recommendation service", () => {
    it("should create a recommendation", async () => {
        jest
            .spyOn(recommendationRepository, "findByName")
            .mockImplementationOnce((): any => {})

        jest
            .spyOn(recommendationRepository, "create")
            .mockImplementationOnce((): any => {})

        await recommendationService.insert(recommendation);

        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
    });

    it("should not create a recommendation", async () => {
        jest
            .spyOn(recommendationRepository, "findByName")
            .mockImplementationOnce((): any => recommendation)

        const promise = recommendationService.insert(recommendation);

        expect(promise).rejects.toEqual({
            type: "conflict",
            message: "Recommendations names must be unique"
        });
        expect(recommendationRepository.create).not.toBeCalled();
    });
})