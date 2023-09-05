describe('results spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/', {
      status: 200,
      fixture: 'savedProjects2'
    })
    cy.visit('http://localhost:3000/form')
    cy.intercept('POST', 'https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/', {
      status: 200,
      fixture: 'unSaved3'
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

  it('should show a helpful message and route to form if the user goes to results before submitting a form', () => {
    cy.visit('http://localhost:3000/results')
    .get('h2').contains('Just like the void of space, there\'s nothing to see here!')
    .get('a')['last']().contains('To Form').click()
    .url().should('eq', 'http://localhost:3000/form')
  })

  it('should allow users to generate a logo', () => {
    cy.completeForm()
    cy.get('.form-button').click()
    cy.get('.custom-logo-box > .design-header-container > .design-header-background > .design-header').should('have.text', 'Exclusive Feature')
    cy.get('.logo-text').should('have.text', 'Want a custom generated logo?')
    cy.intercept('PUT', 'https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/1', {
      status: 200,
      fixture: 'logoAddedProject'
    })
    cy.get('.logo-button').click()
    .get('.logo-image').should('have.attr', 'src')
    cy.get('.project-logo > p').should('have.text', 'Makeup 360')
  })

  it('should display logo if user has already created a logo', () => {
    cy.visit('http://localhost:3000/history/')
    cy.intercept('PUT', 'https://ai-project-planner-be-72e73912044c.herokuapp.com/api/v1/users/1/projects/2', {
      status: 200,
      fixture: 'logoAddedProject'
    })
    cy.get('[href="/history/2"] > .saved-project > .saved-project-details').click()
    .get('.logo-image').should('have.attr', 'src')
    .should("include", "https://i.imgur.com/0W4rdC1.png")
    cy.get('.project-logo > p').should('have.text', 'Style Stash')
  })

  it('should display a timeline that is able to be clicked through', () => {
    cy.completeForm()
    cy.get('.form-button').click()
    .get('.step-focus').should('have.text', 'Step1')
    .get('.timeline-detail').should('have.text', 'Project Setup: Create Git repository and define project structure')
    .get('[alt="timeline control button to next step"]').click()
    .get('.step-focus').should('have.text', 'Step2')
    .get('.timeline-detail').should('have.text', 'Backend Setup: Develop Express.js application, set up API routes')
    .get('[alt="timeline control button to previous step"]').click()
    .get('.step-focus').should('have.text', 'Step1')
    .get('[alt="timeline control button to last step"]').click()
    .get('.step-focus').should('have.text', 'Step3')
    .get('.timeline-detail').should('have.text', 'Database Design: Design and implement database schema')
    .get('[alt="timeline control button to first step"]').click()
    .get('.step-focus').should('have.text', 'Step1')
    .clock()
    .get('[alt="timeline control button to play slideshow"]').click()
    .get('.step-focus').should('have.text', 'Step1')
    .get('.timeline-detail').should('have.text', 'Project Setup: Create Git repository and define project structure')
    .tick(1500)
    .get('.step-focus').should('have.text', 'Step2')
    .get('.timeline-detail').should('have.text', 'Backend Setup: Develop Express.js application, set up API routes')
    .tick(1500)
    .get('.step-focus').should('have.text', 'Step3')
    .get('.timeline-detail').should('have.text', 'Database Design: Design and implement database schema')
  })
})