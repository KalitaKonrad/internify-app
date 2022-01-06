describe('Renders the home page and has linking ', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Renders correctly', () => null);
  it('Allows user to search through offers', () => {
    cy.get('.MuiInputBase-input').clear();
    cy.get('.MuiInputBase-input').type('software');
  });
  it('Routes to companies page', () => {
    cy.get('.MuiButton-label').contains('Companies');
    cy.get('.MuiButton-label').contains('Companies').should('exist');
    cy.get('.MuiButton-label').contains('Companies').click();
    cy.url().should('include', '/companies');
  });
});
