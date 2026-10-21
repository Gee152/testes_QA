# language: pt
@frontend @sortable @drag_and_drop
Funcionalidade: Organização Sequencial de Elementos via Drag and Drop
  Como um usuário da plataforma DemoQA
  Desejo reorganizar os elementos da lista Sortable
  Para garantir a apresentação em ordem sequencial crescente

  @sortable_ascending_order @smoke
  Cenário: Organizar elementos da lista em sequência crescente
    Dado que os elementos da lista Sortable estejam acessíveis e desordenados
    Quando for executada a reorganização dos elementos para a sequência crescente de 1 a 6
    Então a lista deve apresentar todos os elementos em ordem crescente
