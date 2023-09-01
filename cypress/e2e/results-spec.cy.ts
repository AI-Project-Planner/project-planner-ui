describe('results spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects', {
      status: 200,
      fixture: 'savedProjects'
    })
    cy.visit('http://localhost:3000/form')
    cy.intercept('POST', 'https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects/', {
      status: 200,
      fixture: 'unSaved1'
    })
  })

  it('should allow a user to see a results page after filling out a form', () => {
    cy.completeForm()
    cy.get('.form-button').click()
    .get('.project-title').contains('Makeup 360')
    .get('.collab').contains('2')
    .get('.summary-text-container').contains('Makeup 360 is an all-inclusive task management application designed to optimize team collaboration and productivity.')
    .get('.palette-container').children().should('have.length', 6)
    .get('.color')['first']().contains('#FFEEDB')
    .get('.color')['last']().contains('#D8E1FF')
    .get('.features').contains('User registration and login')
    .get('.interaction').contains('User logs in to Makeup 360 account.')
    .get('.carousel-root')
  })

  it.only('should regenerate a new results page based on the form data', () => {
    cy.completeForm()
    cy.get('.form-button').click()
    .get('.project-title').contains('Makeup 360')
    cy.intercept('POST', 'https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects/', {
      status: 200,
      fixture: 'unSaved2'
    }).as('createNew')
    .get('.save-create-button')['last']().click()
    cy.wait(['@createNew']).then((intercept) => {
      
    })
  })

  it('should show a helpful message and route to form if the user goes to results before submitting a form', () => {
    cy.visit('http://localhost:3000/results')
    .get('h2').contains('Just like the void of space, there\'s nothing to see here!')
    .get('a')['last']().contains('To Form').click()
    .url().should('eq', 'http://localhost:3000/form')
  })
})