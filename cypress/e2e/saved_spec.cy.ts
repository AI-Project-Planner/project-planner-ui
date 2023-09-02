describe('saved projects spec', () => {
  beforeEach(() => { 
    cy.stubSingleFetch('users/1/projects', "savedProjects", 200)
  })

  it('should display all saved projects and allow users to view them and unsave', () => {
    const projects = [
      { title: 'Makeup 360', tagline: 'Browse the most stunning makeup...', position: 'first', id: 1 },
    ]
    cy.visit('http://localhost:3000/saved')
      .get('.saved-project').should('have.length', 2)
    projects.forEach((project, i) => {
      cy.intercept('PATCH',`https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/${project.id}`, {
        statusCode: 200, 
        fixture: `unSaved${project.id}`
      }).as(`unSaved${project.id}`) 
      cy.get('.saved-project-title')[project.position]().contains(project.title)
        .get('.saved-project-description')[project.position]().contains(project.tagline)
        .get('.saved-mini-palette')[project.position]().children().should('have.length', 6)
        .get(`[href="/saved/${project.id}"] > .saved-project`).click()
        .url().should('eq', `http://localhost:3000/saved/${project.id}`)
        i === projects.length - 1 ? cy.stubSingleFetch('/users/1/projects', 'unSavedProjects', 200) : cy.stubSingleFetch('/users/1/projects', 'unSavedProj1', 200)
        cy.get('button').contains('Unfavorite Plan').click()
      cy.wait(`@unSavedProj${i === projects.length - 1 ? 'ects' : '1'}`).then((interception) => { 
        cy.get('button').contains('Favorite Plan').should('be.visible')
        cy.get('a').contains('Return to Favorites').click()
        if (i === projects.length - 1) {
          cy.get('.saved-project').should('have.length', 0) 
            .get('p').contains('No favorite projects yet! Generate a project and save it to view it here!')
            .get('a[href="/form"]').contains('Generate a new plan').click()
            .url().should('eq', 'http://localhost:3000/form')
        } else {
          cy.get('.saved-project').should('have.length', projects.length - 1)
        }
      }
      )
    })
  })
})