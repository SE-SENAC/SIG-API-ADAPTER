# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo. O formato é baseado no [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] - 2026-04-10
### Added
- Inicialização do projeto **SIG API ADAPTER (Orquestrador/BFF)**.
- Implementação de Arquitetura Limpa (Clean Architecture / Modelo Hexagonal).
- **Core:** 
  - `AxiosClientService` estruturado com Interceptors.
  - Injeção automática de `Bearer Token` em chamadas HTTP de requisições.
  - Implementação Reativa (Sliding Session) para renovação automática lendo o Header `set-authorization`.
  - Tratamentos e middlewares globais para manipulação de execeções `ErrorHandler`.
  - Configurações do `TSyringe` para o Injeção de Dependência global.
- **Módulo de Autenticação:** `SigAuthGateway` integrado à rota `/logins/form` utilizando credenciais mantidas pelo Servidor Node (Orquestrador). 
- **Módulo de Turmas (Leitura):** 
  - `GET /api/v1/turmas/lista-simples` para consulta limpa e paginada de turmas com suporte a QueryStrings nativos DTO.
  - `GET /api/v1/turmas/:id` (Turma Detalhada). Endpoint enforçado com **Regras Duras de Negócio** que barram o Frontend de exibir turmas impróprias. Bloqueia respostas não comerciais, sem precificação ou turmas com Estado "Bloqueado para matrícula".
- **Módulo de Matrículas (Escrita):**
  - `POST /api/v1/matriculas/gerar-link` para abstração da confusa interface comercial do SIG.
  - Mapper simplificou o Payload. O front-end apenas preencherá o array dinâmico, sendo que o adapter clona o `recursoFinanceiroId` pra a `origemDoRecursoId` de baixo dos panos na hora da montagem do pacote.
- **Documentação Base:**
  - Swagger UI instalado em `/api-docs`.
