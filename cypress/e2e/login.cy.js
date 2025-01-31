/// <reference types="Cypress"/>

describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
  });

  it("should load the login page", () => {
    cy.get("[data-cy='login-title']").should("contain", "Login");
  });

  it("should have a login form with required fields", () => {
    cy.get('[data-cy="login-email-input"]').should("be.visible");
    cy.get('[data-cy="login-password-input"]').should("be.visible");
    cy.get('[data-cy="login-button"]')
      .should("be.visible")
      .and("contain", "Login");
  });

  it("should successfully log in with valid credentials", () => {
    it("Intercept and make a mock response", () => {
      cy.intercept("GET", "http://localhost:3000/users", {
        statusCode: 200,
        body: { email: "jysonmuchiri@gmail.com" },
      }).as("getUser");

      cy.wait("@getUser").then((interception) => {
        expect(interception.response.body.email).to.eq(
          "jysonmuchiri@gmail.com"
        );
      });
    });
  });

  it("should show an error for incorrect credentials", () => {
    cy.get('[data-cy="login-email-input"]').type("this@email.com");
    cy.get('[data-cy="login-password-input"]').type("password");
    cy.get('[data-cy="login-button"]').click();
    cy.get(".error-message").should("contain", "Invalid email or password");
  });

  it("should show an error for invalid email format", () => {
    cy.get('[data-cy="login-email-input"]').type("fake-email");
    cy.get('[data-cy="login-password-input"]').type("sdfsdfs");
    cy.get('[data-cy="login-button"]').click();
    cy.get("[data-cy='error-message']").contains("Invalid email or password.");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('[data-cy="login-button"]').click();
    cy.get("[data-cy='error-message']").contains("All fields are required.");
  });

  it("Show a link to sign up", () => {
    cy.get('p').contains(
      "Already have an account? Sign Up"
    );
  });
});
