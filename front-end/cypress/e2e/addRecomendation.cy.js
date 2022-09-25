/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

describe("create a recommendation", () => {
  it("create successfully", () => {
    cy.visit("http://localhost:3000");

    cy.get("input[placeholder='Name']").type("How to make 1M");
    cy.get("input[placeholder='https://youtu.be/...']").type(
      "https://youtu.be/CK_BCMA9yoY"
    );

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.intercept("GET", "/recommendations").as("getRecommendations");

    cy.get("button").click();

    cy.wait("@createRecommendation");
    cy.wait("@getRecommendations");

    cy.contains("How to make 1M").should("be.visible");
  });
});
