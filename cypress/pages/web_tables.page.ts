import { faker } from '@faker-js/faker'
import type { TableRecord } from '../types/types'

export class WebTablesPage {
  visit() {
    cy.visit('/webtables')
    cy.cleanDemoQABanners()
  }

  isReady() {
    cy.get('#addNewRecordButton').should('be.visible')
    cy.get('table').should('be.visible')
  }

  addRecord(record: TableRecord) {
    cy.cleanDemoQABanners()
    cy.get('#addNewRecordButton').click({ force: true })
    cy.get('#firstName').clear().type(record.firstName)
    cy.get('#lastName').clear().type(record.lastName)
    cy.get('#userEmail').clear().type(record.email)
    cy.get('#age').clear().type(record.age.toString())
    cy.get('#salary').clear().type(record.salary.toString())
    cy.get('#department').clear().type(record.department)
    cy.get('#submit').click({ force: true })
    cy.get('#userForm').should('not.exist')
  }

  editDepartment(fullName: string, newDepartment: string) {
    const firstName = fullName.split(' ')[0]
    cy.get('#searchBox').clear().type(firstName)
    cy.get('table tbody tr').contains('td', firstName).parents('tr').within(() => {
      cy.get('[title="Edit"]').click({ force: true })
    })
    cy.get('#department').clear().type(newDepartment)
    cy.get('#submit').click({ force: true })
    cy.get('#userForm').should('not.exist')
    cy.get('#searchBox').clear()
  }

  deleteRecord(fullName: string) {
    const firstName = fullName.split(' ')[0]
    cy.get('#searchBox').clear().type(firstName)
    cy.get('table tbody tr').contains('td', firstName).parents('tr').within(() => {
      cy.get('[title="Delete"]').click({ force: true })
    })
    cy.get('#searchBox').clear()
  }

  validateRecordNotPresent(fullName: string) {
    const firstName = fullName.split(' ')[0]
    cy.get('#searchBox').clear().type(firstName)
    cy.get('table tbody').should('not.contain.text', firstName)
    cy.get('#searchBox').clear()
  }

  createBatchRecords(count: number, prefix: string) {
    // Ajusta o tamanho da página na paginação (.pagination select)
    cy.get('.pagination select').select('20')

    for (let i = 1; i <= count; i++) {
      this.addRecord({
        firstName: `${prefix}${i}`,
        lastName: `User${i}`,
        email: `batch${i}_${faker.number.int({ min: 1000, max: 9999 })}@test.com`,
        age: 20 + i,
        salary: 3000 + (i * 100),
        department: 'QA Engineering',
      })
    }
  }

  deleteAllBatchRecords(prefix: string) {
    cy.get('#searchBox').clear().type(prefix)
    // Deleta os registros filtrados sucessivamente
    const deleteNext = () => {
      cy.get('table tbody').then(($tbody) => {
        if ($tbody.find('[title="Delete"]').length > 0) {
          cy.get('[title="Delete"]').first().click({ force: true })
          cy.wait(400)
          deleteNext()
        }
      })
    }
    deleteNext()
    cy.get('#searchBox').clear()
  }

  validateNoBatchRecords(prefix: string) {
    cy.get('#searchBox').clear().type(prefix)
    cy.get('table tbody').should('not.contain.text', prefix)
    cy.get('#searchBox').clear()
  }
}
