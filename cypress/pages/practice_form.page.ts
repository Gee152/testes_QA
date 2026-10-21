import { faker } from '@faker-js/faker'
import type { StudentFormData } from '../types/types'

export class PracticeFormPage {
  private lastSubmittedData: StudentFormData | null = null

  visit() {
    cy.visit('/automation-practice-form')
    cy.cleanDemoQABanners()
  }

  isReady() {
    cy.get('#userForm').should('be.visible')
  }

  generateRandomData(): StudentFormData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      gender: 'Male',
      mobileNumber: faker.string.numeric(10),
      subjects: 'Maths',
      hobbies: 'Sports',
      currentAddress: faker.location.streetAddress(),
    }
  }

  fillAndSubmit(data: StudentFormData, fixtureFilePath: string) {
    this.lastSubmittedData = data

    cy.get('#firstName').clear().type(data.firstName)
    cy.get('#lastName').clear().type(data.lastName)
    cy.get('#userEmail').clear().type(data.email)
    cy.get('label[for="gender-radio-1"]').click({ force: true })
    cy.get('#userNumber').clear().type(data.mobileNumber)

    // Subjects
    cy.get('#subjectsInput').type(`${data.subjects}{enter}`)

    // Hobbies
    cy.get('label[for="hobbies-checkbox-1"]').click({ force: true })

    // File Upload
    cy.get('#uploadPicture').selectFile(fixtureFilePath)

    // Current Address
    cy.get('#currentAddress').clear().type(data.currentAddress)

    // State & City
    cy.get('#state').click({ force: true }).find('input').type('NCR{enter}', { force: true })
    cy.get('#city').click({ force: true }).find('input').type('Delhi{enter}', { force: true })

    // Submit
    cy.get('#submit').click({ force: true })
  }

  validateSubmissionSuccess() {
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible')
    cy.get('#example-modal-sizes-title-lg').should('contain.text', 'Thanks for submitting the form')
  }

  validateSubmittedData() {
    expect(this.lastSubmittedData).to.exist
    const data = this.lastSubmittedData!

    cy.get('.table-responsive').within(() => {
      cy.contains('td', `${data.firstName} ${data.lastName}`).should('be.visible')
      cy.contains('td', data.email).should('be.visible')
      cy.contains('td', data.gender).should('be.visible')
      cy.contains('td', data.mobileNumber).should('be.visible')
      cy.contains('td', data.subjects).should('be.visible')
      cy.contains('td', data.hobbies).should('be.visible')
      cy.contains('td', 'sample.txt').should('be.visible')
      cy.contains('td', data.currentAddress).should('be.visible')
      cy.contains('td', 'NCR Delhi').should('be.visible')
    })
  }

  closeModal() {
    cy.cleanDemoQABanners()
    cy.get('#closeLargeModal').scrollIntoView().click({ force: true })
    cy.get('body').then(($body) => {
      if ($body.find('#example-modal-sizes-title-lg').length > 0) {
        cy.get('body').type('{esc}')
      }
    })
    cy.get('#example-modal-sizes-title-lg').should('not.exist')
  }
}
