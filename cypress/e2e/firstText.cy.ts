describe('template spec', () => {
  it('renders the default elements on the screen', () => {
    cy.visit('http://localhost:5173')

    cy.get("[data-testid='cypress-title']")
    .should('exist')
    .should('have.text', 'Cypress Demo')
  });

  it ('renders the todos on the screen', () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="todo-1"]').should("exist");
    cy.get('[data-testid="todo-2"]').should("exist");
    cy.get('[data-testid="todo-3"]').should("exist");
    cy.get('[data-testid="todo-4"]').should("exist");
    cy.get('[data-testid="todo-5"]').should("exist");
  })
})