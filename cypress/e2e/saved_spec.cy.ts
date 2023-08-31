describe('saved projects spec', () => {
  beforeEach(() => { 
    cy.stubSingleFetch('users/1/projects', "savedProjects", 200)
  })

  it('should display all saved projects and allow users to view them and unsave', () => {
    const projects = [
      { title: 'Makeup 360', tagline: 'Browse the most stunning makeup...', position: 'first', id: 1 },
      { title: 'Style Stash', tagline: 'Organize your closet', position: 'last', id: 2}
    ]
    cy.visit('http://localhost:3000/saved')
      .get('.saved-project').should('have.length', 2)
    projects.forEach((project, i) => {
      cy.intercept('PATCH',`https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects/${project.id}`, {
        statusCode: 200, 
        fixture: `unSaved${project.id}`
      }).as(`unSaved${project.id}`) 
      cy.get('.saved-project-title')[project.position]().contains(project.title)
        .get('.saved-project-description')[project.position]().contains(project.tagline)
        .get('.saved-mini-palette')[project.position]().children().should('have.length', 6)
        .get(`[href="/saved/${project.id}"] > .saved-project`).click()
        .url().should('eq', `http://localhost:3000/saved/${project.id}`)
        i === projects.length - 1 ? cy.stubSingleFetch('/users/1/projects', 'unSavedProjects', 200) : cy.stubSingleFetch('/users/1/projects', 'unSavedProj1', 200)
        cy.get('button').contains('Unsave Plan').click()
      cy.wait(`@unSavedProj${i === projects.length - 1 ? 'ects' : '1'}`).then((interception) => { 
        cy.get('button').contains('Save Plan').should('be.visible')
        cy.get('a').contains('Return to Saved').click()
        i === projects.length - 1 ?  cy.get('.saved-project').should('have.length', 0) :  cy.get('.saved-project').should('have.length', projects.length - 1)
      }
      )
    })
  })
})