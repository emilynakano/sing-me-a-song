/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

describe("downvote a recommendation", () => {
  it("downvote successfully", () => {
    cy.visit("http://localhost:3000");

    cy.addRecommendation();

    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");

    cy.get("[data-cy=downvote]").click();

    cy.get("[data-cy=score]").should(($p) => {
      expect($p).to.contain("-1");
    });
  });
});
