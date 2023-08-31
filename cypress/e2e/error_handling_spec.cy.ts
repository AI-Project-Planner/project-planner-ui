describe('error handling spec', () => {

  beforeEach(() => { 
    // cy.stubSingleFetch()
    cy.intercept('GET', 'https://8c3a0c1f-6f70-4e2c-82aa-c8e6de99ae51.mock.pstmn.io/api/v1/users/1/projects', {
      statusCode: 200, 
    })
  })
  it('should display a message and button for bad routes', () => {
    cy.checkBadRoute('/')
      .checkBadRoute('/form/')
      .checkBadRoute('/saved/')
      .checkBadRoute('/results/')
  })
})