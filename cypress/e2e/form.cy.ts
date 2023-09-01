describe('User can fill out form to generate a new plan ', () => {
  beforeEach(()=> {
    return cy.visit('http://localhost:3000/form')
    .intercept(
      "GET",
      "https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects",
      {
        statusCode: 200,
        fixture: 'savedProjects'
      }
    )
  })

  it('Should allow user to fill out form ', () => {
    cy.get('.form-question').should('have.text', 'Choose Your Application Type')
    cy.get('.form-type-container').children().should('have.length', 3)
    cy.get(':nth-child(1) > .form-type-text').should('have.text', 'Front End')
    cy.get(':nth-child(2) > .form-type-text').should('have.text', 'Back End')
    cy.get(':nth-child(3) > .form-type-text').should('have.text', 'Full Stack')
    cy.get(':nth-child(1) > .form-type-text').click()
    cy.get('.form-button').click()
    cy.get('.form-question').should('have.text', 'Which Technologies Would You Like to Use?')
    cy.get('.form-input').type('react')
    cy.get('.form-tech-stack').should('have.text', 'react')
    cy.get('.form-tech-input-container > .form-icon').click()
    cy.get('.form-tech-stack-chosen-single').should('have.text', 'react')
    cy.get('.form-tech-stack-chosen').children().should('have.length', 1)
    cy.get('.form-button').click()
    cy.get('.form-question').should('have.text', 'How Long Do You Have to Create This App?')
    cy.get('input.form-input').type('1')
    cy.get('select.form-input').select('week')
    cy.get('.form-button').click()
    cy.get('.form-question').should('have.text', 'How Many Collaborators Will There Be?')
    cy.get('.form-input').type('2')
    cy.intercept(
      "POST",
      "https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects/",
      {
        statusCode: 200,
        fixture: 'form'
      }
    ).as("form-post");
    cy.get('.form-button').click()
    cy.wait('@form-post').then((intercept) => {
      cy.url().should("include", "/results")
    })
  })
})