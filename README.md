# Aula01

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

**Projeto**
**Resumo:** Aplicação Angular simples com uma calculadora. A lógica de cálculo foi movida para um backend .NET Minimal API. seguindo alguns passos e dicas da seguinte aula (https://www.youtube.com/watch?v=UXMKOgmQ7zI)

**Funcionalidades Principais**

- Formulário de calculadora (primeiro número, operação, segundo número).
- Carregamento das operações disponíveis via API (`/api/calculadora/operacoes`).
- Envio dos dados para o backend (`/api/calculadora/calcular`).

**Tecnologias Usadas**

- Frontend: Angular, TypeScript, Reactive Forms
- Backend: .NET Minimal API (arquivo `IniciacaoBackend/Program.cs`)
- Ferramentas:npm, Angular CLI, .NET SDK

 O backend está rodando na porta 5055

 O frontend está rodando na porta 4200 (http://localhost:4200)

**Endpoints principais (backend)**

- GET `/api/calculadora/operacoes` — retorna as operações listadas (nome, sigla, valor).
- POST `/api/calculadora/calcular` — recebe um JSsON { Num1, Num2, Operacao } e retorna { Resultado } ou erro com mensagem (erro de conexão, normalmente 404).

e receber `404 Not Found` ao chamar `/api/calculadora/calcular`, verifique que:
	- O backend está em execução na porta 5055.
	- O frontend está usando a URL correta (ver environment.ts).
	- O navegador não está rodando com algum cache antigo corrompido.

- O backend tem CORS habilitado para http://localhost:4200 

**Sobre o CORS**
**(achei interessante aplicar para o problema de conexão que estava tendo)**
https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS

- Com ele consegui permitir que o navegador aceite respostas de um servidor em outra origem (por exemplo: o frontend em `http://localhost:4200` e backend em `http://localhost:5055`). Sem CORS o navegador estava bloqueando a resposta.



//Terminal VScode
//dotnet run --project "D:\Projetos C\IniciacaoFrontend\IniciacaoBackend"

//Terminal 
//cd D:\Projetos C\IniciacaoFrontend
//npm start