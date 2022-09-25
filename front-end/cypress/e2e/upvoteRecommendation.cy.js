/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

describe("upvote a recommendation", () => {
  it("create successfully", () => {
    cy.visit("http://localhost:3000");

    cy.addRecommendation();

    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");

    cy.get("[data-cy=upvote]").click();

    cy.get("[data-cy=score]").should(($p) => {
      expect($p).to.contain("1");
    });
  });
});
