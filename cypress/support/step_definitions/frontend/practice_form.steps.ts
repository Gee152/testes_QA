import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { PracticeFormPage } from '../../../pages/practice_form.page'

const Dado = Given
const Quando = When
const Então = Then
const E = Then

const practiceFormPage = new PracticeFormPage()

Dado('que o formulário de cadastro Practice Form esteja pronto para preenchimento', () => {
  practiceFormPage.visit()
  practiceFormPage.isReady()
})

Quando('for realizada a submissão do formulário com dados dinâmicos válidos e arquivo anexado', () => {
  const dynamicData = practiceFormPage.generateRandomData()
  practiceFormPage.fillAndSubmit(dynamicData, 'cypress/fixtures/sample.txt')
})

Então('o sistema deve confirmar o recebimento dos dados através do modal de sucesso', () => {
  practiceFormPage.validateSubmissionSuccess()
})

E('os dados confirmados no resumo devem corresponder às informações submetidas', () => {
  practiceFormPage.validateSubmittedData()
})

E('deve ser possível concluir a interação fechando o resumo', () => {
  practiceFormPage.closeModal()
})
