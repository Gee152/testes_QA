# language: pt
@frontend @windows
Funcionalidade: Gerenciamento de Múltiplas Janelas e Abas
  Como um usuário da plataforma DemoQA
  Desejo acessar conteúdos abertos em janelas externas
  Para validar a integridade das informações e manter a navegação íntegra

  @new_window_validation @smoke
  Cenário: Abertura e validação de conteúdo em nova janela
    Dado que a interface de janelas do navegador esteja acessível
    Quando for solicitada a abertura de uma nova janela
    Então a página de destino deve exibir o conteúdo de amostra esperado
    E o contexto de navegação deve retornar com sucesso para a página de origem
