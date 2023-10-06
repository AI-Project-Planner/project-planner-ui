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

  it.only('Should display error messages in form if inputs are filled out incorrectly', () => {
    cy.get('img[alt="icon for fullstack type"]').click()
      .get('.form-button').click()
      .get('.form-button').click()
      .get('.form-error').should('have.text', 'PLEASE ADD TECHNOLOGIES!')
      .get('.form-input').type('react')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-input').type('react')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-error').should('have.text', 'YOU CAN ONLY CHOOSE 1 FE FRAMEWORK!')
      .get('.form-input').type('javascript')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-input').type('javascript')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-error').should('have.text', 'JAVASCRIPT IS ALREADY SELECTED!')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-error').should('have.text', 'PLEASE SELECT AN OPTION FROM THE LIST OF TECHNOLOGIES.')
      .get('.form-input').type('BLAHHH')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-error').should('have.text', 'BLAHHH IS NOT A TECHNOLOGY YOU CAN CHOOSE! SORRY!')
      .get('.form-input').type('ruby/rails')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-input').type('devise')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-input').type('sidekiq')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-input').type('postgresql')
      .get('.form-tech-input-container > .form-icon-button > .form-icon').click()
      .get('.form-error').should('have.text', 'YOU CAN ONLY CHOOSE UP TO 5 TECHNOLOGIES!')
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
        cy.get('.homepage-title').should('have.text', 'Oh No!')
          .get('p').contains("We've run out of credits for the OpenAI API")
          .get('p').contains('Visit our all projects page to see all of the previously generated projects!')
          .get('a').contains('Go to All Projects')
      })
  })
})