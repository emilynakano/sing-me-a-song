/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// eslint-disable-next-line no-undef
Cypress.Commands.add("resetDatabase", () => {
  // eslint-disable-next-line no-undef
  cy.request("POST", "http://localhost:5002/e2e/reset");
});

Cypress.Commands.add("addRecommendation", () => {
  const recommendation = {
    name: "How to make 1M",
    youtubeLink: "https://youtu.be/CK_BCMA9yoY",
  };

  cy.request("POST", "http://localhost:5002/recommendations", recommendation);
});
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
