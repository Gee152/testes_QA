import '@4tw/cypress-drag-drop'

// Custom command para remover anúncios flutuantes e banners do DemoQA que bloqueiam cliques
Cypress.Commands.add('cleanDemoQABanners', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#fixedban').length > 0) {
      cy.get('#fixedban').invoke('remove')
    }
    if ($body.find('footer').length > 0) {
      cy.get('footer').invoke('remove')
    }
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      cleanDemoQABanners(): Chainable<void>
    }
  }
}

export {}
