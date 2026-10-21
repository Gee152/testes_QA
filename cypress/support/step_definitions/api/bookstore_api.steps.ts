import { Given, When, Then, defineStep, Before } from '@badeball/cypress-cucumber-preprocessor'
import { BookstoreService, generateValidCredentials } from '../../../services/bookstore_service'
import type { ApiScenarioContext } from '../../../types/types'

// Aliases em português para Gherkin
const Dado = Given
const Quando = When
const Então = Then
const E = defineStep

const service = new BookstoreService()

// Scenario Context — Estado isolado por cenário (Clean Code)

let ctx: ApiScenarioContext = {}

// Hook de preparação: limpa o contexto e valida a saúde da API antes de cada cenário
Before({ tags: '@api' }, () => {
  ctx = {}
  cy.request({
    method: 'GET',
    url: 'https://demoqa.com/BookStore/v1/Books',
    failOnStatusCode: false,
    timeout: 15000,
  }).then((res) => {
    expect(res.status, 'Healthcheck da API DemoQA Book Store').to.eq(200)
  })
})

// CENÁRIO 1: Cadastro e autenticação de um novo usuário

Dado('que existam credenciais válidas e não cadastradas', () => {
  ctx.credentials = generateValidCredentials()
})

Quando('for realizado o cadastro e a autenticação do novo usuário', () => {
  service.createUser(ctx.credentials!).then((userRes) => {
    ctx.createUserResponse = userRes
    ctx.userId = userRes.body.userID

    service.generateToken(ctx.credentials!).then((tokenRes) => {
      ctx.tokenResponse = tokenRes
      ctx.token = tokenRes.body.token
    })
  })
})

Então('a conta deve ser criada com sucesso', () => {
  expect(ctx.createUserResponse).to.exist
  expect(ctx.createUserResponse!.status).to.eq(201)
  expect(ctx.createUserResponse!.body.userID).to.be.a('string').and.not.empty
  expect(ctx.createUserResponse!.body.username).to.eq(ctx.credentials!.userName)
})

E('o token de acesso deve ser gerado e autorizado para o usuário', () => {
  expect(ctx.tokenResponse).to.exist
  expect(ctx.tokenResponse!.status).to.eq(200)
  expect(ctx.tokenResponse!.body.token).to.be.a('string').and.not.empty
  expect(ctx.tokenResponse!.body.status).to.be.oneOf(['Success', 'Authorization Token Generated.'])

  service.checkAuthorized(ctx.credentials!).then((authRes) => {
    expect(authRes.status).to.eq(200)
    expect(authRes.body).to.eq(true)
  })
})

// CENÁRIO 2: Alugar livros disponíveis no catálogo

Dado('que exista um usuário cadastrado e autenticado na plataforma', () => {
  service.createAndAuthenticateUser().then((user) => {
    ctx.credentials = user.credentials
    ctx.userId = user.userId
    ctx.token = user.token
  })
})

E('que existam livros disponíveis no catálogo da Book Store', () => {
  service.getBooks().then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body.books).to.be.an('array').and.have.length.greaterThan(1)
    ctx.availableBooks = res.body.books
  })
})

Quando('for realizada a reserva de 2 livros disponíveis para a conta do usuário', () => {
  expect(ctx.availableBooks, 'Livros do catálogo').to.exist
  ctx.selectedIsbns = [ctx.availableBooks![0].isbn, ctx.availableBooks![1].isbn]

  service.rentBooks(ctx.userId!, ctx.selectedIsbns, ctx.token!).then((res) => {
    ctx.rentResponse = res
  })
})

Então('os livros selecionados devem ser vinculados à conta com sucesso', () => {
  expect(ctx.rentResponse).to.exist
  expect(ctx.rentResponse!.status).to.eq(201)
})

E('o perfil do usuário deve conter exatamente os livros alugados', () => {
  service.getUserDetails(ctx.userId!, ctx.token!).then((res) => {
    expect(res.status).to.eq(200)
    const userBooks: { isbn: string }[] = res.body.books
    expect(userBooks).to.have.length(ctx.selectedIsbns!.length)

    const rentedIsbns = userBooks.map((b) => b.isbn)
    expect(rentedIsbns).to.include.members(ctx.selectedIsbns!)
  })
})
