import { Given, When, Then, defineStep } from '@badeball/cypress-cucumber-preprocessor'
import { WebTablesPage } from '../../../pages/web_tables.page'

const Dado = Given
const Quando = When
const Então = Then
const E = defineStep

const webTablesPage = new WebTablesPage()
const BATCH_PREFIX = 'QAUser'

Dado('que a tela de Web Tables esteja pronta para gerenciamento de registros', () => {
  webTablesPage.visit()
  webTablesPage.isReady()
})

Quando('for realizada a criação, edição para {string} e posterior exclusão do colaborador {string}', (newDepartment: string, fullName: string) => {
  const [firstName, lastName] = fullName.split(' ')

  // 1. Criar
  webTablesPage.addRecord({
    firstName,
    lastName,
    email: 'joao.silva@test.com',
    age: 30,
    salary: 5000,
    department: 'QA',
  })

  // 2. Editar
  webTablesPage.editDepartment(fullName, newDepartment)

  // 3. Excluir
  webTablesPage.deleteRecord(fullName)
})

Então('a listagem da tabela deve refletir a ausência final do colaborador removido', () => {
  webTablesPage.validateRecordNotPresent('João Silva')
})

Dado('que a tela de Web Tables esteja pronta para operações em lote', () => {
  webTablesPage.visit()
  webTablesPage.isReady()
})

Quando('for realizada a inserção em lote de 12 novos colaboradores dinâmicos', () => {
  webTablesPage.createBatchRecords(12, BATCH_PREFIX)
})

E('for solicitada a exclusão de todos os registros adicionados', () => {
  webTablesPage.deleteAllBatchRecords(BATCH_PREFIX)
})

Então('a tabela não deve reter nenhum dos colaboradores criados no lote', () => {
  webTablesPage.validateNoBatchRecords(BATCH_PREFIX)
})
