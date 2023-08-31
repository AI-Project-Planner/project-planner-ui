describe('error handling spec', () => {
  beforeEach(() => { 
    cy.stubSingleFetch('users/1/projects', "savedProjects", 200)
  })
  it('should display a message and button for bad routes', () => {
    cy.checkBadRoute('/')
      .checkBadRoute('/form/')
      .checkBadRoute('/saved/')
      .checkBadRoute('/results/')
  })
})