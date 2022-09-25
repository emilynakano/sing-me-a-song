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

const id = 1

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

    it("should upvote a recommendation", async () => {
        jest
            .spyOn(recommendationRepository, "find")
            .mockImplementationOnce((): any => recommendation)
        
        jest
            .spyOn(recommendationRepository, "updateScore")
            .mockImplementationOnce((): any => {})
        
        await recommendationService.upvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("should not upvote a recommendation", async () => {
        jest
            .spyOn(recommendationRepository, "find")
            .mockImplementationOnce((): any => {})
        
        const promise = recommendationService.upvote(id);

        expect(promise).rejects.toEqual({
            type: "not_found",
            message: ""
        });
        expect(recommendationRepository.updateScore).not.toBeCalled();
    });

    it("should downvote a recommendation", async () => {
        jest
            .spyOn(recommendationRepository, "find")
            .mockImplementationOnce((): any => recommendation)
        
        jest
            .spyOn(recommendationRepository, "updateScore")
            .mockImplementationOnce((): any => { return { score: 1 } })
        
        await recommendationService.downvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
    });

    it("should downvote and remove recommendation", async () => {
        jest
            .spyOn(recommendationRepository, "find")
            .mockImplementationOnce((): any => recommendation)
        
        jest
            .spyOn(recommendationRepository, "updateScore")
            .mockImplementationOnce((): any => { return { score: -6 } })

        jest
            .spyOn(recommendationRepository, "remove")
            .mockImplementationOnce((): any => {})
        
        await recommendationService.downvote(id);

        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    });

    it("should not downvote", async () => {
        jest
            .spyOn(recommendationRepository, "find")
            .mockImplementationOnce((): any => {})
        
        const promise = recommendationService.downvote(id);

        expect(promise).rejects.toEqual({
            type: "not_found",
            message: ""
        });
        expect(recommendationRepository.updateScore).not.toBeCalled();
    });
})