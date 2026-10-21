import '@4tw/cypress-drag-drop'

// Custom command para remover anúncios flutuantes e banners do DemoQA que bloqueiam cliques
Cypress.Commands.add('cleanDemoQABanners', () => {
  cy.get('body').then(($body) => {
    $body.find('#fixedban, footer, iframe, ins.adsbygoogle, [id^="google_ads"], #adplus-anchor').remove()
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
