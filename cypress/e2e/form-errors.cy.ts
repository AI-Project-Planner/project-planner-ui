describe('User will be able to error messages if form is filled out incorrectly', () => {
  beforeEach(() => {
    return cy.visit('http://localhost:3000/form')
      .intercept(
        "GET",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects",
        {
          statusCode: 200,
          fixture: 'savedProjects'
        }
      )
  })

  it('Should display error messages in form if inputs are filled out incorrectly', () => {
    cy.get(':nth-child(1) > .form-type-text').click()
      .get('.form-button').click()
      .get('.form-button').click()
      .get('.form-error').should('have.text', 'PLEASE ADD TECHNOLOGIES!')
      .get('.form-input').type('react')
      .get('.form-tech-input-container > .form-icon').click()
      .get('.form-button').click()
      .get('.form-button').click()
      .get('.form-error').should('have.text', 'PLEASE SELECT AMOUNT OF TIME!')
      .get('input.form-input').type('1')
      .get('select.form-input').select('week')
      .get('.form-button').click()
      .get('.form-button').click()
      .get('.form-error').should('have.text', 'PLEASE ENTER NUMBER OF COLLABORATORS!')
  })

  it('Should display error message if form fails to send', () => {
    cy.completeForm()
      cy.intercept(
        "POST",
        "https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/",
        {
          statusCode: 500,
          body: {message: 'Internal server error'}
        }
      ).as("form-post")
      .get('.form-button').click()
      .wait('@form-post').then((intercept) => {
        cy.get('.app-error').should('have.text', 'An error occured, please try again later!')
      })
  })
})