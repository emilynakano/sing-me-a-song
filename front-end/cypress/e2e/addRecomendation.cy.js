/* eslint-disable no-undef */
beforeEach(() => {
  cy.resetDatabase();
});

const recommendation = {
  name: "How to make 1M",
  youtubeLInk: "https://youtu.be/CK_BCMA9yoY",
};

describe("create a recommendation", () => {
  it("create successfully", () => {
    cy.visit("http://localhost:3000");

    cy.get("input[placeholder='Name']").type(recommendation.name);
    cy.get("input[placeholder='https://youtu.be/...']").type(
      recommendation.youtubeLInk
    );

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.intercept("GET", "/recommendations").as("getRecommendations");

    cy.get("button").click();

    cy.wait("@createRecommendation");
    cy.wait("@getRecommendations");

    cy.contains(recommendation.name).should("be.visible");
  });
});
