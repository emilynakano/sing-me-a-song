/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

describe("random page", () => {
  it("go to random page", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-cy=random]").click();

    cy.url().should("equal", "http://localhost:3000/random");
  });
});
