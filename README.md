# SIG API Adapter (Orchestrator)

Este projeto atua como um **BFF (Backend for Frontend) e Orquestrador** entre suas aplicações empresariais e a robusta API do SIG Educacional. Desenvolvido em **Node.js, Express e TypeScript** seguindo os preceitos de Clean Architecture e SOLID.

## 🚀 O Problema Que Resolvemos
A interação direta de sistemas front-end (Single Page Applications) com a API do SIG envolve a manipulação de tokens complexos de autenticação, JSONs gigantescos e envio redundante de IDs em formulários de vendas. 

**Nosso Orquestrador**:
1. Gerencia secretamente o ciclo de Token Bearer de Autenticação na Memória RAM do servidor, com auto-refresh reativo. Seu FrontEnd NUNCA precisa lidar com tokens do SIG.
2. Atua como um *Anti-Corruption Layer*. Processa e valida os dados antes de entregá-los, impedindo que Turmas Canceladas ou Gratuitas cheguem às telas de vendas.
3. Permite acesso seguro através do CORS contido apenas à intranet ou domínios da empresa.

---

## 🛠 Arquitetura Limpa (Clean Architecture)

- **Domain (`/domain`)**: O coração das regras de negócio. Entidades, Interfaces de Contrato (Gateways) e os DTOs que trafegamos livremente pela nossa aplicação.
- **Application (`/application/use-cases`)**: Casos de uso do negócio. Onde regras estritas são implementadas. Ex: Bloquear JSON de turmas que não estão `"Liberado Para Matrícula"`.
- **Infrastructure (`/infrastructure`)**:
  - **Controllers**: Porteiros que escutam as rotas de rede (HTTP).
  - **Adapters**: Gateways que efetuam os dispares *Post/Get* reais utilizando a biblioteca AxiosCentralizada.
  - **Mappers**: Varredores que traduzem os `JSON` horripilantes vindos da Integração externa para Nossas Tipagens TS perfeitas.
- **Core (`/core`)**: Injeção de Dependências TSyringe, Gerenciadores Globais de HTTP, Tratativas Customizadas de Erro, e Configuração.

---

## 📄 Requisitos e Instalação

* Node 18+
* Npm ou Yarn

Renomeie seu `.env.example` para `.env` preenchendo as variáveis principais:
```env
PORT=3000
API_URL=https://cloud.plataforma.senac.br

# Credenciais de Maquina / Oauth do SIG
OAUTH_USERNAME=integ...
OAUTH_PASSWORD=senha...
```

Instale as dependências:
```bash
npm install
```

Inicie o Servidor de Desenvolvimento:
```bash
npm run dev
```

---

## 📚 Especificação da API (Swagger UI)
Após o ambiente rodando, você pode acessar de forma fácil pelo seu navegador:
> **http://localhost:3000/api-docs**

Para entender todas as documentuais, métodos, queries e *regras de negócio do Orquestrador*.

## 🔑 Principais Rotas

* `GET /health` (Ping)
* `GET /api/v1/turmas/lista-simples` (Retorna turmas de forma básica - com base em *QueryStrings*)
* `GET /api/v1/turmas/{id}` (Detalha a turma E verifica se pode ser vendida, falhando caso contrário).
* `POST /api/v1/matriculas/gerar-link` (Retorna link de matrícula com base nos Cursos requeridos).

---
*Mantenha este Orquestrador blindado.*
