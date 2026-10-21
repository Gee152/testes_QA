# language: pt
@frontend @forms
Funcionalidade: Submissão de Formulário de Cadastro de Estudante
  Como um usuário da plataforma DemoQA
  Desejo submeter o formulário de cadastro com dados dinâmicos e anexo
  Para confirmar o registro com sucesso

  @practice_form_submission @smoke
  Cenário: Enviar formulário com dados cadastrais e anexo válidos
    Dado que o formulário de cadastro Practice Form esteja pronto para preenchimento
    Quando for realizada a submissão do formulário com dados dinâmicos válidos e arquivo anexado
    Então o sistema deve confirmar o recebimento dos dados através do modal de sucesso
    E os dados confirmados no resumo devem corresponder às informações submetidas
    E deve ser possível concluir a interação fechando o resumo
