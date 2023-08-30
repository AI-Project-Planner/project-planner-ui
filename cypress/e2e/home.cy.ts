describe('Users can visit the homepage and navigate', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:3000')
  })

  it('Should be able to go to homepage', () => {
    cy.url().should("include", "/")
    .get('.app-logo > img').should('be.visible')
    .get('.light').should('be.visible')
    .get('h1').should('have.text', 'Welcome to Project Planner')
    .get('button.popup-button').should('have.text', 'View Tutorial')
    .get('a.popup-button').should('have.text', 'Generate New Project Plan')
  })
})