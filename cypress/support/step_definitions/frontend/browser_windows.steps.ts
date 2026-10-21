import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { BrowserWindowsPage } from '../../../pages/browser_windows.page'

const Dado = Given
const Quando = When
const Então = Then
const E = Then

const browserWindowsPage = new BrowserWindowsPage()

Dado('que a interface de janelas do navegador esteja acessível', () => {
  browserWindowsPage.visit()
  browserWindowsPage.isReady()
})

Quando('for solicitada a abertura de uma nova janela', () => {
  browserWindowsPage.openNewWindow()
})

Então('a página de destino deve exibir o conteúdo de amostra esperado', () => {
  browserWindowsPage.validateSamplePageContent()
})

E('o contexto de navegação deve retornar com sucesso para a página de origem', () => {
  browserWindowsPage.returnToOrigin()
})
