import { Book, TokenResponse, UserCredentials, UserResponse } from './bookstore.types'

export interface TableRecord {
  firstName: string
  lastName: string
  email: string
  age: number
  salary: number
  department: string
}

export interface ApiScenarioContext {
  credentials?: UserCredentials
  userId?: string
  token?: string
  createUserResponse?: Cypress.Response<{ userID: string; username: string; books: [] }>
  tokenResponse?: Cypress.Response<TokenResponse>
  availableBooks?: Book[]
  selectedIsbns?: string[]
  rentResponse?: Cypress.Response<UserResponse>
}

export interface StudentFormData {
  firstName: string
  lastName: string
  email: string
  gender: string
  mobileNumber: string
  subjects: string
  hobbies: string
  currentAddress: string
}