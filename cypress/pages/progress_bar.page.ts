export class ProgressBarPage {
  private stoppedProgressValue = 0

  visit() {
    cy.visit('/progress-bar')
    cy.cleanDemoQABanners()
  }

  isInitialState() {
    cy.get('div[role="progressbar"]').should('have.attr', 'aria-valuenow', '0')
  }

  startAndStopBefore25() {
    cy.cleanDemoQABanners()
    cy.get('#startStopButton').scrollIntoView().should('be.visible').click()
    cy.get('div[role="progressbar"]').should(($el) => {
      const val = parseInt($el.attr('aria-valuenow') || '0', 10)
      expect(val).to.be.greaterThan(0)
    })
    cy.get('#startStopButton').click()
    cy.get('div[role="progressbar"]').then(($el) => {
      this.stoppedProgressValue = parseInt($el.attr('aria-valuenow') || '0', 10)
    })
  }

  completeAndReset() {
    cy.cleanDemoQABanners()
    cy.get('#startStopButton').then(($btn) => {
      if ($btn.text().includes('Start')) {
        cy.wrap($btn).click()
      }
    })
    cy.get('div[role="progressbar"]', { timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')
    // Aguarda o ciclo interno do DemoQA ultrapassar 100 (r > 100) para invocar clearInterval(this.timer)
    cy.wait(400)
    cy.cleanDemoQABanners()
    cy.get('#resetButton', { timeout: 10000 }).scrollIntoView().should('be.visible').click()
  }

  executeFullCycleWithPauseAndReset() {
    this.startAndStopBefore25()
    this.completeAndReset()
  }

  validateStoppedProgressUnderOrEqual25() {
    expect(this.stoppedProgressValue).to.be.greaterThan(0)
    expect(this.stoppedProgressValue).to.be.at.most(25)
  }

  validateReset() {
    cy.get('div[role="progressbar"]', { timeout: 10000 }).should('have.attr', 'aria-valuenow', '0')
    cy.get('#startStopButton', { timeout: 10000 }).should('be.visible')
  }
}
