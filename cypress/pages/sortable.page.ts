export class SortablePage {
  visit() {
    cy.visit('/sortable')
    cy.cleanDemoQABanners()
  }

  isReady() {
    cy.get('#demo-tabpane-list').should('be.visible')
    cy.get('#demo-tabpane-list .list-group-item').should('have.length', 6)
  }

  sortAscending() {
    // Reorganiza os elementos sequencialmente na ordem de 1 a 6
    const expected = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    expected.forEach((itemText, index) => {
      const targetSelector = `#demo-tabpane-list .list-group-item:nth-child(${index + 1})`
      cy.contains('#demo-tabpane-list .list-group-item', itemText).then(($item) => {
        if ($item.index() !== index) {
          cy.wrap($item).drag(targetSelector, { force: true })
        }
      })
    })
  }

  validateAscendingOrder() {
    const expected = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    cy.get('#demo-tabpane-list .list-group-item').each(($el, index) => {
      expect($el.text().trim()).to.eq(expected[index])
    })
  }
}
