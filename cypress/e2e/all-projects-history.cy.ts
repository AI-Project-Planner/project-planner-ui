describe('Users should be able to see a history of all projects generated', () => {
  beforeEach(() => {
    return cy.visit('http://localhost:3000/history')
      .get('[src="/static/media/person1.e82800b7bd3a81edd244.png"]').click()
      .intercept(
        "GET",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects",
        {
          statusCode: 200,
          fixture: 'unSavedProjects'
        }
      )
      .intercept(
        "DELETE",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/1/",
        {
          statusCode: 200,
          fixture: 'unSaved3'
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
      .get('.save-create-link').should('have.text', 'Delete From HistoryReturn to History')
      .url().should('include', '/history/1')
  }) 

  it('Should be able to delete projects from history', () => {
    cy.get('[href="/history/1"] > .saved-project').click()
    cy.intercept(
      "GET",
      "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects",
      {
        statusCode: 200,
        fixture: 'unSavedProjects1'
      }
    ).as('newHistory')
    .get('.save-create-button').contains('Delete From History').click()
    cy.wait('@newHistory').then((intercept) => {
      cy.get('.saved-projects-container').should('have.length', 1)
      .get('[href="/history/2"] > .saved-project > .saved-project-details > .saved-project-title').should('have.text', 'Style Stash')
    })
  })
})