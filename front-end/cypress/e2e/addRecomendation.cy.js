/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

const recommendation = {
  name: "How to make 1M",
  youtubeLink: "https://youtu.be/CK_BCMA9yoY",
};

describe("create a recommendation", () => {
  it("create successfully", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-cy=recommendation-name]").type(recommendation.name);
    cy.get("[data-cy=recommendation-link]").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.intercept("GET", "/recommendations").as("getRecommendations");

    cy.get("[data-cy=submit-recommendation]").click();

    cy.wait("@createRecommendation");
    cy.wait("@getRecommendations");

    cy.contains(recommendation.name).should("be.visible");
  });
});
