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

    it("should get recommendations", async () => {
        jest
            .spyOn(recommendationRepository, "findAll")
            .mockImplementationOnce((): any => {})

        await recommendationService.get();

        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("should get top recommendations", async () => {
        jest
            .spyOn(recommendationRepository, "getAmountByScore")
            .mockImplementationOnce((): any => {})

        await recommendationService.getTop(1);

        expect(recommendationRepository.getAmountByScore).toBeCalled();
    });


    it("should get score filter 'gt' ", async () => {
        const result = recommendationService.getScoreFilter(0.6)

        expect(result).toEqual("gt");
    });

    it("should get score filter 'lte' ", async () => {
        const result = recommendationService.getScoreFilter(0.8)

        expect(result).toEqual("lte");
    });

    it("should get recommendations by score", async () => {
        jest
            .spyOn(recommendationRepository, "findAll")
            .mockImplementationOnce((): any => [{id: 1}])

        await recommendationService.getByScore("gt")

        expect(recommendationRepository.findAll).toBeCalled();
    });

    it("should get an empty array of recommendation by score", async () => {
        jest
            .spyOn(recommendationRepository, "findAll")
            .mockImplementationOnce((): any => [])

        await recommendationService.getByScore("gt")

        expect(recommendationRepository.findAll).toBeCalled();
    });
    

    
})