import { faker } from '@faker-js/faker'
import type { UserCredentials, UserResponse, TokenResponse, BooksResponse, RentBooksPayload } from '../types/bookstore.types'

const BASE_URL = 'https://demoqa.com'

/**
 * Generates credentials that satisfy DemoQA's strict password policy:
 * min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char.
 */
export function generateValidCredentials(): UserCredentials {
  const userName = `qa_${faker.internet.username().replace(/[^a-zA-Z0-9]/g, '')}_${faker.number.int({ min: 1000, max: 9999 })}`
  // Compose password parts to guarantee policy compliance
  const upper = faker.string.alpha({ length: 2, casing: 'upper' })
  const lower = faker.string.alpha({ length: 4, casing: 'lower' })
  const digit = faker.number.int({ min: 10, max: 99 }).toString()
  const special = faker.helpers.arrayElement(['@', '#', '$', '!', '%'])
  const password = `${upper}${lower}${digit}${special}`
  return { userName, password }
}

export class BookstoreService {
  /**
   * POST /Account/v1/User — Creates a new user account.
   */
  createUser(credentials: UserCredentials): Cypress.Chainable<Cypress.Response<{ userID: string; username: string; books: [] }>> {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/Account/v1/User`,
      body: credentials,
      failOnStatusCode: false,
    })
  }

  /**
   * POST /Account/v1/GenerateToken — Generates a JWT Bearer token.
   */
  generateToken(credentials: UserCredentials): Cypress.Chainable<Cypress.Response<TokenResponse>> {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/Account/v1/GenerateToken`,
      body: credentials,
      failOnStatusCode: false,
    })
  }

  /**
   * POST /Account/v1/Authorized — Validates user authorization.
   */
  checkAuthorized(credentials: UserCredentials): Cypress.Chainable<Cypress.Response<boolean>> {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/Account/v1/Authorized`,
      body: credentials,
      failOnStatusCode: false,
    })
  }

  /**
   * GET /BookStore/v1/Books — Retrieves available books catalog.
   */
  getBooks(): Cypress.Chainable<Cypress.Response<BooksResponse>> {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/BookStore/v1/Books`,
    })
  }

  /**
   * POST /BookStore/v1/Books — Rents books for a specific user.
   */
  rentBooks(userId: string, isbns: string[], token: string): Cypress.Chainable<Cypress.Response<UserResponse>> {
    const payload: RentBooksPayload = {
      userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn })),
    }
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/BookStore/v1/Books`,
      headers: { Authorization: `Bearer ${token}` },
      body: payload,
      failOnStatusCode: false,
    })
  }

  /**
   * GET /Account/v1/User/{userId} — Retrieves user details including rented books.
   */
  getUserDetails(userId: string, token: string): Cypress.Chainable<Cypress.Response<UserResponse>> {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/Account/v1/User/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    })
  }

  /**
   * Setup Helper: Cria e autentica um usuário dinâmico para isolamento de testes.
   */
  createAndAuthenticateUser(): Cypress.Chainable<{
    credentials: UserCredentials
    userId: string
    token: string
  }> {
    const credentials = generateValidCredentials()
    return this.createUser(credentials).then((userRes) => {
      expect(userRes.status).to.eq(201)
      const userId = userRes.body.userID

      return this.generateToken(credentials).then((tokenRes) => {
        expect(tokenRes.status).to.eq(200)
        expect(tokenRes.body.token).to.be.a('string').and.not.empty
        return cy.wrap({ credentials, userId, token: tokenRes.body.token })
      })
    })
  }
}

