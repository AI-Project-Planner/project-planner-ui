describe('User will be able to error messages if form is filled out incorrectly', () => {
  beforeEach(()=> {
    cy.loadHomepage();
  })

  it('Should display error messages in form', () => {
    cy.visit('https://example.cypress.io')
  })
})