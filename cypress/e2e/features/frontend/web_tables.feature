# language: pt
@frontend @webtables
Funcionalidade: Gerenciamento de Colaboradores em Web Tables
  Como um usuário da plataforma DemoQA
  Desejo gerenciar os registros de colaboradores na tabela
  Para manter a listagem atualizada e consistente

  @webtables_crud @smoke
  Cenário: Ciclo completo de inclusão, atualização e remoção de colaborador
    Dado que a tela de Web Tables esteja pronta para gerenciamento de registros
    Quando for realizada a criação, edição para "QA Lead" e posterior exclusão do colaborador "João Silva"
    Então a listagem da tabela deve refletir a ausência final do colaborador removido

  @webtables_bonus_batch @bonus
  Cenário: Gerenciamento em lote de múltiplos registros
    Dado que a tela de Web Tables esteja pronta para operações em lote
    Quando for realizada a inserção em lote de 12 novos colaboradores dinâmicos
    E for solicitada a exclusão de todos os registros adicionados
    Então a tabela não deve reter nenhum dos colaboradores criados no lote
