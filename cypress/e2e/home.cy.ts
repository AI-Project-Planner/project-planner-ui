describe('Users can visit the homepage and navigate', () => {
  beforeEach(()=> {
    cy.loadHomepage();
  })

  it('Should be able to go to homepage', () => {
    cy.url().should("include", "/")
    .get('.app-logo > img').should('be.visible')
    .get('.light').should('be.visible')
    .get('h1').should('have.text', ' Welcome to Project Planner')
    .get('[href="/tutorial"]').should('have.text', 'View Tutorial')
    .get('[href="/form"]').should('have.text', 'Generate New Project Plan')
  })

  it('Should be able to navigate to other pages', () => {
    cy.get('.clear-bg-btn > img').click()
    cy.get('[href="/"] > .clear-bg-btn').should('have.text', 'Home')
    cy.get('[href="/form"] > .clear-bg-btn').should('have.text', 'New Project')
    cy.get('[href="/saved"] > .clear-bg-btn').should('have.text', 'Saved Projects')
    cy.get('[href="/form"] > .clear-bg-btn').click()
    cy.url().should("include", "/form")
    cy.get('.clear-bg-btn > img').click()
    cy.get('[href="/saved"] > .clear-bg-btn').click()
    cy.url().should("include", "/saved")
    cy.get('.clear-bg-btn > img').click()
    cy.get('[href="/"] > .clear-bg-btn').click()
    cy.url().should("include", "/")
  })
})