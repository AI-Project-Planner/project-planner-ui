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
    cy.get('[href="/saved"] > .clear-bg-btn').should('have.text', 'Favorite Projects')
    cy.get('[href="/form"] > .clear-bg-btn').click()
    cy.url().should("include", "/form")
    cy.get('.clear-bg-btn > img').click()
    cy.get('[href="/saved"] > .clear-bg-btn').click()
    cy.url().should("include", "/saved")
    cy.get('.clear-bg-btn > img').click()
    cy.get('[href="/"] > .clear-bg-btn').click()
    cy.url().should("include", "/")
  })

  it('Should allow users to view tutorial on how to use application', () => {
    cy.get('[href="/tutorial"]').click()
    .url().should('include', '/tutorial')
    cy.get('.homepage-title').should('have.text', 'Step 1')
    cy.get('.tutorial-gif > img').should('be.visible')
    cy.get('.directions').should('have.text', 'Fill out questionnaire regarding your projects details, and click submit to have AI generate a project idea and detailed plan!')
    cy.get('.form-button').should('have.text', 'CONTINUE')
    cy.get('.form-button').click()
    cy.get('.homepage-title').should('have.text', 'Step 2')
    cy.get('.directions').should('have.text', 'View your results, and decide if you want to save it to your favorites, or generate a new project idea!')
    cy.get('.tutorial-gif > img').should('be.visible')
    cy.get('.form-button').should('have.text', 'CONTINUE')
    cy.get('.form-button').click()
    cy.get('.homepage-title').should('have.text', 'Step 3')
    cy.get('.directions').should('have.text', 'Want to change things up for a project you\'ve generated? Click on \"Edit Plan\" to add new features, change the title, make a new color palette, or even generate a logo!')
    cy.get('.form-button').should('have.text', 'GET STARTED')
    cy.get('.form-button').click()
    cy.url().should('include', '/form')
  })
})