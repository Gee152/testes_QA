# language: pt
@frontend @progressbar
Funcionalidade: Controle Dinâmico da Barra de Progresso
  Como um usuário da plataforma DemoQA
  Desejo controlar o carregamento dinâmico da barra de progresso
  Para validar a precisão de interrupção, conclusão e reinicialização

  @progressbar_flow @smoke
  Cenário: Controlar o ciclo de carregamento e reinicialização da barra de progresso
    Dado que a barra de progresso esteja acessível no estado inicial
    Quando for executado o ciclo de carregamento com interrupção abaixo de 25% e conclusão com reset
    Então o valor atingido na interrupção deve ser menor ou igual a 25%
    E a barra de progresso deve retornar ao valor inicial de 0%
