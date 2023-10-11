describe('User can fill out form to generate a new plan ', () => {
  beforeEach(() => {
    return cy.visit('http://localhost:3000/form')
      .get('[src="/static/media/person1.e82800b7bd3a81edd244.png"]').click()
      .intercept(
        "GET",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects",
        {
          statusCode: 200,
          fixture: 'savedProjects'
        }
      )
  })

  it('Should allow user to fill out form ', () => {
    cy.get('.form-question').should('have.text', 'Choose Your Application Type')
      .get('.form-type-container').children().should('have.length', 3)
      .get(':nth-child(1) > .form-type-text').should('have.text', 'Front End')
      .get(':nth-child(2) > .form-type-text').should('have.text', 'Back End')
      .get(':nth-child(3) > .form-type-text').should('have.text', 'Full Stack')
      .get(':nth-child(1) > .form-type-text').click()
      .get('.form-button').click()
      .get('.form-question').should('have.text', 'Which Technologies Would You Like to Use?')
      .get('.form-input').type('react')
      .get('.form-tech-stack').should('have.text', 'react')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-tech-stack-chosen-single').should('have.text', 'react')
      .get('.form-tech-stack-chosen').children().should('have.length', 1)
      .get('.form-input').type('javascript')
      .get('.form-tech-stack').should('have.text', 'javascript')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-tech-stack-chosen').children().should('have.length', 2)
      .get('#javascript-delete-btn').click()
      .get('.form-tech-stack-chosen').children().should('have.length', 1)
      .get('.form-button').click()
      .get('.form-question').should('have.text', 'How Long Do You Have to Create This App?')
      .get('input.form-input').type('1')
      .get('select.form-input').select('week')
      .get('.form-button').click()
      .get('.form-question').should('have.text', 'How Many Collaborators Will There Be?')
      .get('.form-input').type('2')
      .intercept(
        "POST",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/",
        {
          statusCode: 200,
          fixture: 'form'
        }
      ).as("form-post")
      .get('.form-button').click()
      .wait('@form-post').then((intercept) => {
        cy.url().should("include", "/results")
      })
  })
})