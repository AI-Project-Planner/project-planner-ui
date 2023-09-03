describe('Users should be able to see a history of all projects generated', () => {
  beforeEach(() => {
    return cy.visit('http://localhost:3000/history')
      .intercept(
        "GET",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects",
        {
          statusCode: 200,
          fixture: 'savedProjects'
        }
      )
  })

  it('Should be able to go to projects history page from nav', () => {
    cy.get('.clear-bg-btn > img').click()
    .get('[href="/history"] > .clear-bg-btn').should('be.visible')
    .get('[href="/history"] > .clear-bg-btn').click()
    .url().should('include', '/history')
  })

  it('Should display history of all projects on project history page', () => {
    cy.get('.saved-page-title').should('have.text', 'Generated Projects History')
      .get('.saved-projects-container').children().should('have.length', 2)
      .get('[href="/history/1"] > .saved-project > .saved-project-details > .saved-project-title').should('have.text', 'Makeup 360')
      .get('[href="/history/2"] > .saved-project > .saved-project-details > .saved-project-title').should('have.text', 'Style Stash')
      .get('[href="/history/1"] > .saved-project').click()
      .get('.save-create-link').should('have.text', 'Return to History')
      .url().should('include', '/history/1')
  }) 
})