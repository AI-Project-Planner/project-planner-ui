describe('template spec', () => {
  it('should edit a project', () => {
    cy.stubSingleFetch('users/1/projects', "savedProjects", 200)
    cy.visit('http://localhost:3000/history/1')
      .get('[src="/static/media/person1.e82800b7bd3a81edd244.png"]').click()
      .get('button').contains('Edit Plan').click()
      .get('input[type="text"]').first().should('have.value', 'Makeup 360').clear().type('Makeup Guru').should('have.value', 'Makeup Guru')
      .get('.features > .feat-inter-header > .results-editing-form > input').should('have.value', '').type('This new feature').should('have.value', 'This new feature')
      .get('.editing-add-button').first().click()
      .get('.features > .feat-inter-text > :nth-child(1)').contains('This new feature')
      .get('.delete-btn').first().click()
      .get('.features > .feat-inter-text > :nth-child(1)').contains('User registration and login')
      .get('.interaction > .feat-inter-header > .results-editing-form > input').should('have.value', '').type('This new interaction').should('have.value', 'This new interaction')
      .get('.editing-add-button').last().click()
    cy.intercept('PUT', 'https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/1/', {
      statusCode: 201, 
      fixture: 'editedMakeup'
    }).as('putReq')
      .get('button').contains('Save Changes').click()
    cy.wait('@putReq').then((interception) => {
      cy.get('.project-title').contains('Makeup Guru')
    })
  })
})