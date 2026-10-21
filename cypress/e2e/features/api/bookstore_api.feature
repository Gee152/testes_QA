# language: pt
@api @bookstore
Funcionalidade: Gestão de Contas e Reserva de Livros na Book Store API
  Como um usuário da plataforma DemoQA
  Desejo gerenciar minha conta e reservar livros no catálogo
  Para consultar meus livros alugados com sucesso

  @auth @smoke
  Cenário: Cadastro e autenticação de um novo usuário com sucesso
    Dado que existam credenciais válidas e não cadastradas
    Quando for realizado o cadastro e a autenticação do novo usuário
    Então a conta deve ser criada com sucesso
    E o token de acesso deve ser gerado e autorizado para o usuário

  @rent @smoke
  Cenário: Alugar livros disponíveis no catálogo para um usuário autenticado
    Dado que exista um usuário cadastrado e autenticado na plataforma
    E que existam livros disponíveis no catálogo da Book Store
    Quando for realizada a reserva de 2 livros disponíveis para a conta do usuário
    Então os livros selecionados devem ser vinculados à conta com sucesso
    E o perfil do usuário deve conter exatamente os livros alugados
