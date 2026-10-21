# QA Automation Engineer — Cypress & Cucumber BDD Suite

> Suíte completa e profissional de testes automatizados para aplicações Web (E2E) e APIs REST, construída com **Cypress**, **TypeScript** e **Cucumber (BDD Canônico)**, totalmente integrada a pipelines de **CI/CD** no **GitHub Actions**.

---

## ⚡ Visão Geral do Projeto

Este repositório contém a automação de testes cobrindo fluxos críticos de **Frontend** e **API** da plataforma [DemoQA](https://demoqa.com), aplicando arquitetura desacoplada e padrões modernos da Engenharia de Qualidade:

- **Gherkin BDD Canônico e Declarativo**: Cenários focados em regras de negócio e intenção do usuário (`Dado` ➔ `Quando` ➔ `Então` ➔ `E`), eliminando anti-padrões imperativos e alternâncias cíclicas (*ping-pong*).
- **Page Object Model (POM)**: Camada de UI 100% isolada em classes de página, garantindo manutenibilidade e esperas determinísticas.
- **API Service Client Pattern**: Requisições HTTP (`cy.request`) e validações de contrato encapsuladas em serviços dedicados.
- **Tipagem Estrita com TypeScript**: Interfaces para contratos de payload, respostas de API e contexto de cenários.
- **Massa Dinâmica e Resiliente**: Geração de dados via `@faker-js/faker`, respeitando regras de complexidade de senha e evitando dependência de dados estáticos pré-existentes.
- **Pipeline de Integração Contínua (CI/CD)**: Execução paralela e automatizada com relatórios e upload de evidências no GitHub Actions.

---

## 📦 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu ambiente:

- [Node.js](https://nodejs.org/) (versão **18.x** ou **20.x LTS**)
- [npm](https://www.npmjs.com/) (versão **9.x** ou superior)
- [Git](https://git-scm.com/)
- Editor de código recomendado: [VS Code](https://code.visualstudio.com/) com extensões *Cucumber (Gherkin)* e *Prettier*.

---

## 🗂 Estrutura do Projeto

```
testes_QA/
├── .github/
│   └── workflows/
│       └── ci.yml                            # Pipeline de CI/CD (GitHub Actions)
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       ├── api/
│   │       │   └── bookstore_api.feature     # Cenários BDD de API (Book Store & Account)
│   │       └── frontend/
│   │           ├── browser_windows.feature   # Cenários BDD de Múltiplas Janelas/Abas
│   │           ├── practice_form.feature     # Cenários BDD de Formulário de Estudante
│   │           ├── progress_bar.feature      # Cenários BDD de Barra de Progresso
│   │           ├── sortable.feature          # Cenários BDD de Drag & Drop
│   │           └── web_tables.feature        # Cenários BDD de Web Tables (CRUD & Lote)
│   ├── fixtures/
│   │   └── sample.txt                        # Arquivo para teste de upload
│   ├── pages/                                # Page Object Model (POM)
│   │   ├── browser_windows.page.ts
│   │   ├── practice_form.page.ts
│   │   ├── progress_bar.page.ts
│   │   ├── sortable.page.ts
│   │   └── web_tables.page.ts
│   ├── services/                             # API Service Clients
│   │   └── bookstore_service.ts              # Encapsulamento de requisições cy.request
│   ├── support/
│   │   ├── commands.ts                       # Comandos customizados Cypress
│   │   ├── e2e.ts                            # Suporte global e tratativas de exceção
│   │   └── step_definitions/                 # Mapeamento dos passos BDD
│   │       ├── api/
│   │       │   └── bookstore_api.steps.ts
│   │       └── frontend/
│   │           ├── browser_windows.steps.ts
│   │           ├── practice_form.steps.ts
│   │           ├── progress_bar.steps.ts
│   │           ├── sortable.steps.ts
│   │           └── web_tables.steps.ts
│   └── types/                                # Interfaces e Contratos TypeScript
│       ├── bookstore.types.ts                # Modelos de API (User, Token, Books)
│       └── types.ts                          # Contextos de cenário e formulários
├── .cypress-cucumber-preprocessorrc.json     # Configuração de mapeamento dos steps BDD
├── .gitignore                                # Arquivos e diretórios ignorados pelo Git
├── cypress.config.ts                         # Configurações globais e bundler esbuild
├── package.json                              # Dependências e scripts NPM
├── tsconfig.json                             # Configuração do compilador TypeScript
└── README.md                                 # Documentação do projeto
```

---

## ⚙️ Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Gee152/testes_QA.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd testes_QA
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Valide a tipagem estática (TypeScript):**
   ```bash
   npm run typecheck
   ```

---

## 🚀 Scripts NPM Disponíveis

| Comando | Descrição |
|---|---|
| `npm run test` | Executa todos os testes automatizados (API e Frontend) em modo headless. |
| `npm run test:api` | Executa exclusivamente a suíte de testes da **Book Store API**. |
| `npm run test:ui` | Executa exclusivamente a suíte de testes de **Frontend E2E**. |
| `npm run typecheck` | Executa o compilador TypeScript (`tsc --noEmit`) para validação estática. |
| `npm run cypress:open` | Abre o **Cypress Test Runner** no modo gráfico interativo. |
| `npm run cypress:run` | Executa todos os testes no terminal via Electron headless. |

---

## 🧪 Cobertura dos Testes

### 🌐 1. Automação de API (`cypress/e2e/features/api/`)
* **Book Store & Account API (`bookstore_api.feature`)**:
  - **Cenário 1 (`@auth`)**: Geração dinâmica de credenciais válidas com Faker, criação de usuário (`POST /Account/v1/User`), geração de token JWT (`POST /Account/v1/GenerateToken`) e validação de autorização (`POST /Account/v1/Authorized`).
  - **Cenário 2 (`@rent`)**: Isolamento de pré-condições via helper, consulta de livros no catálogo (`GET /BookStore/v1/Books`), aluguel de 2 livros (`POST /BookStore/v1/Books`) e auditoria de detalhes da conta (`GET /Account/v1/User/{userId}`).

### 🖥️ 2. Automação de Frontend (`cypress/e2e/features/frontend/`)
* **Practice Form (`practice_form.feature`)**: Preenchimento completo de formulário dinâmico com Faker (dados pessoais, rádio de gênero, calendário, disciplinas, hobbies, upload de arquivo `sample.txt`, endereço, estado e cidade), submissão e auditoria dos valores no modal de confirmação.
* **Browser Windows (`browser_windows.feature`)**: Interceptação de abertura de novas janelas via stub de `window.open`, navegação até a página filha de amostra e retorno consistente à página de origem.
* **Progress Bar (`progress_bar.feature`)**: Controle de carregamento dinâmico em 2 cenários atômicos: interrupção controlada antes de 25% e conclusão em 100% seguida de reinicialização para 0%.
* **Web Tables (`web_tables.feature`)**: Ciclo completo de vida de registro (criação, edição de departamento para "QA Lead" e exclusão) e cenário bônus de inserção/exclusão em lote de **12 colaboradores dinâmicos** com paginação.
* **Sortable (`sortable.feature`)**: Reordenação sequencial de elementos de lista via drag and drop nativo utilizando `@4tw/cypress-drag-drop`.

---

## 📌 Principais Ferramentas e Tecnologias

- **[Cypress](https://www.cypress.io/)** (v13+): Framework de automação E2E e de integração de APIs.
- **[TypeScript](https://www.typescriptlang.org/)** (v5+): Tipagem estática, contratos de dados e segurança de código.
- **[@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)**: Integração nativa de BDD/Gherkin com suporte a tags, hooks e internacionalização (`pt`).
- **[@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor)**: Compilação de alta performance para TypeScript e arquivos `.feature`.
- **[@faker-js/faker](https://fakerjs.dev/)**: Geração de dados randômicos realistas para garantir a independência dos testes.
- **[@4tw/cypress-drag-drop](https://github.com/4teamwork/cypress-drag-drop)**: Suporte a eventos de arrastar e soltar (drag & drop) no navegador.

---

## 🔄 Pipeline de Integração Contínua (CI/CD)

O projeto possui uma pipeline configurada no GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) com:

1. **Validação Estática**: Verificação de tipos via `tsc --noEmit` antes de iniciar os testes.
2. **Execução Paralela**: Separação dos jobs de **API** e **Frontend** para feedback rápido.
3. **Disparo Manual Flexível (`workflow_dispatch`)**: Possibilidade de executar a suíte completa (`all`) ou filtrar apenas `api` ou `ui`.
4. **Armazenamento de Evidências**: Em caso de falha, prints (`screenshots`) e vídeos de execução são anexados automaticamente como artefatos da Action com retenção de 7 dias.

---

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

## 👤 Autor

Desenvolvido por **Gabriel** ([@Gee152](https://github.com/Gee152)).
Projeto criado para automação e garantia da qualidade de software (QA Automation).
