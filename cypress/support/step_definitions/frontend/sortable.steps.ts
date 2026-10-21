import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { SortablePage } from '../../../pages/sortable.page'

const Dado = Given
const Quando = When
const Então = Then

const sortablePage = new SortablePage()

Dado('que os elementos da lista Sortable estejam acessíveis e desordenados', () => {
  sortablePage.visit()
  sortablePage.isReady()
})

Quando('for executada a reorganização dos elementos para a sequência crescente de 1 a 6', () => {
  sortablePage.sortAscending()
})

Então('a lista deve apresentar todos os elementos em ordem crescente', () => {
  sortablePage.validateAscendingOrder()
})
