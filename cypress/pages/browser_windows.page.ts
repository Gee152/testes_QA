export class BrowserWindowsPage {
  visit() {
    cy.visit('/browser-windows')
    cy.cleanDemoQABanners()
  }

  isReady() {
    cy.get('#windowButton').should('be.visible')
  }

  openNewWindow() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })
    cy.get('#windowButton').click()
  }

  validateSamplePageContent() {
    cy.get('@windowOpen').should('be.calledWithMatch', /sample/)
    cy.visit('/sample')
    cy.get('#sampleHeading').should('be.visible').and('contain.text', 'This is a sample page')
  }

  returnToOrigin() {
    cy.visit('/browser-windows')
    cy.get('#windowButton').should('be.visible')
  }
}
