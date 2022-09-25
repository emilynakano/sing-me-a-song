/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

describe("go to top page", () => {
  it("downvote successfully", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-cy=top]").click();

    cy.url().should("equal", "http://localhost:3000/top");
  });
});
