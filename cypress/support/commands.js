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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillForm", (formData) => {
  for (const name in formData) {
    const { label, value, type } = formData[name];

    if (type === "dropdown") {
      cy.contains(label).next().click();
      cy.contains(value).click();
    } else if (type === "textarea") {
      cy.get(`textarea[name="${name}"]`).type(value);
    } else {
      cy.get(`input[name="${name}"]`).type(value);
    }
  }
});

Cypress.Commands.add("refillForm", (formData) => {
  for (const name in formData) {
    const { label, value, type } = formData[name];

    if (type === "dropdown") {
      cy.contains(label).next().click();
      cy.contains(value).click();
    } else if (type === "textarea") {
      cy.get(`textarea[name="${name}"]`).clear().type(value);
    } else {
      cy.get(`input[name="${name}"]`).clear().type(value);
    }
  }
});
