# Desafio Cadeconsig - Desenvolvedor Full Stack

Este desafio tem como objetivo avaliar habilidades de desenvolvimento full stack, incluindo setup de backend, integração com API, autenticação e construção de um frontend funcional.

O candidato deverá configurar e executar a API localmente e desenvolver um frontend básico que consuma os endpoints fornecidos.

---

# 1º ponto de avaliação

Configurar e executar o backend localmente apenas por meio da análise dos arquivos do projeto.
Nenhuma documentação adicional será fornecida intencionalmente.

A ausência de documentação faz parte do desafio e tem como objetivo avaliar a capacidade do candidato de compreender um projeto existente, identificar dependências, variáveis de ambiente, fluxo de execução e regras de negócio a partir do código-fonte.

**O candidato terá acesso apenas:**

- ao código do projeto;
- às rotas disponíveis na API;
- aos filtros e comportamentos expostos pelos endpoints.

**Serão avaliadas habilidades como:**

- leitura e interpretação de código;
- autonomia técnica;
- capacidade de depuração;
- entendimento de arquitetura e padrões utilizados;
- tomada de decisão diante de cenários incompletos ou ambíguos.

## Backend

- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Upload de arquivos CSV

## Endpoints

### POST /login

Envio um json com as chaves `usuario` e `senha` e receba um token JWT para as demais requests

### POST /contratos/upload

Upload de CSV (multipart/form-data, campo `file`) com ate 100 linhas. O modelo do arquivo para upload
foi deixado na raiz do projeto com o nome contratos_100.csv.

### GET /contratos

Listagem com filtros e paginação. Todos os campos podem ser filtrados.

Query params aceitos:

- `id_contrato`
- `nome_cliente`
- `email_cliente`
- `tipo_plano` (Basico | Pro | Enterprise)
- `valor_mensal`
- `status` (Ativo | Inativo)
- `data_inicio` (ISO 8601)
- `page` (default 1)
- `limit` (default 20, max 100)

---

# 2º ponto de avaliação

O candidato deverá implementar um frontend utilizando Next.js 15 (React), com foco em boas práticas, qualidade de código e uso de recursos modernos do ecossistema React/Next

## Implementação do Frontend — Next.js 15

### Telas obrigatórias

**Tela de Login**

- Autenticação do usuário via API.
- Armazenamento adequado do token JWT.
- Envio do token em todas as requisições autenticadas através do header.

**Tela de Upload de CSV**

- Upload de arquivo CSV para cadastro de contratos utilizando o endpoint correspondente.
- Exibição de feedback visual ao usuário:
  - Toast de sucesso em caso de upload bem-sucedido.
  - Toast de erro em caso de falha.
  - Exibição da quantidade de registros inseridos quando aplicável.

**Tela de Listagem de Contratos**

- Implementação da listagem de contratos consumindo a API.
- Paginação de dados.
- Filtro de dados.
- Tratamento adequado dos seguintes estados:
  - Carregamento
  - Lista vazia
  - Erro de requisição

### Stack obrigatória (Next/React)

O frontend deve ser desenvolvido obrigatoriamente com:

- Next.js 15 + App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form + Zod (validação)
- React Query (TanStack Query) para cache, loading states e revalidação

### Expectativas técnicas

Serão avaliados os seguintes aspectos técnicos:

- Organização de pastas e componentes seguindo boas práticas do App Router
- Implementação de formulários com validação completa utilizando Zod e React Hook Form
- Atenção à experiência do usuário (UX):
  - Estados de loading
  - Mensagens de erro claras
  - Feedbacks de sucesso
  - Botões desabilitados durante submissões
- Tipagem correta e consistente:
  - Autenticação
  - Contratos
  - Paginação
  - Filtros
- Uso consistente do design system (Shadcn UI + Tailwind CSS)

---

# 3º ponto de avaliação

O candidato deverá organizar e entregar o projeto seguindo os requisitos abaixo, garantindo rastreabilidade e boas práticas de versionamento.

## Repositório e estrutura obrigatória

- Criar um repositório público no GitHub com o nome: `desafio-cade-consig-[nome-do-candidato]`
- Dentro do repositório deve conter:
  - Uma pasta chamada `upload-contratos` com o projeto frontend
  - Currículo atualizado do candidato

É obrigatório commits consistentes e seguindo o padrão [Conventional Commits]("https://www.conventionalcommits.org/en/v1.0.0/").

## Envio do projeto

- Enviar o link do repositório público por e-mail para: desenvolvimento@cadeconsig.com.br
- Assunto do e-mail (assunto): Desafio Cadê Consig - Nome do Candidato
