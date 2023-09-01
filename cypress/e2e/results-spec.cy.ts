describe('results spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects', {
      status: 200,
      fixture: 'savedProjects'
    }).as('getEpisodes')
    cy.visit('http://localhost:3000/form')
  })

  it('should allow a user to see a results page after filling out a form', () => {
    cy.completeForm()
  })
})