import { Given, When, Then, defineStep } from '@badeball/cypress-cucumber-preprocessor'
import { ProgressBarPage } from '../../../pages/progress_bar.page'

const Dado = Given
const Quando = When
const Então = Then
const E = defineStep

const progressBarPage = new ProgressBarPage()

Dado('que a barra de progresso esteja acessível no estado inicial', () => {
  progressBarPage.visit()
  progressBarPage.isInitialState()
})

Quando('for executado o ciclo de carregamento com interrupção abaixo de 25% e conclusão com reset', () => {
  progressBarPage.executeFullCycleWithPauseAndReset()
})

Então('o valor atingido na interrupção deve ser menor ou igual a 25%', () => {
  progressBarPage.validateStoppedProgressUnderOrEqual25()
})

E('a barra de progresso deve retornar ao valor inicial de 0%', () => {
  progressBarPage.validateReset()
})
