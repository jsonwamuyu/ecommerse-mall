describe("Test signup page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
  });

  it("Should have a header with text Signup", () => {
    cy.get("h1").contains("Sign Up");
  });

  it("Should show an error for empty input", ()=>{
    cy.get('[data-cy="signup-button"]').click();
    cy.get('[data-cy="error-message"]').contains('All fields are required.')
  })
  it("should show validation errors for empty fields", () => {
    cy.get('[data-cy="signup-button"]').click();
    cy.get("[data-cy='error-message']").contains("All fields are required.");
  });

  it("Show a link to sign up", () => {
    cy.get('p').contains(
      "Already have an account? Login"
    );
  });
});
