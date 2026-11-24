# Turismo das Araras

Site multipágina sobre os atrativos turísticos de Barra do Garças e do Vale do Araguaia, agora com backend, contas de usuário, painel de moderação e recursos de PWA.

## Estrutura

```
.
├── backend/      API em Node.js + Express + SQLite
└── frontend/     HTML, CSS e JavaScript puro (sem build)
```

## Frontend

- `frontend/index.html` — página inicial
- `frontend/destinos.html` — catálogo com pesquisa e filtros
- `frontend/sobre.html`, `noticias.html`, `contato.html`
- `frontend/login.html` e `cadastro.html` — autenticação integrada ao backend
- `frontend/admin.html` — painel do moderador (relatos e mensagens)
- Páginas individuais dos atrativos (ex.: `serraazul.html`, `aguasquentes.html`)
- `frontend/js/app.js` — catálogo, login, cadastro, contato e registro do PWA
- `frontend/js/admin.js` — painel do moderador
- `frontend/manifest.webmanifest` e `frontend/sw.js` — instalação e cache offline

## Backend

O backend foi adaptado do projeto de referência e inclui:

- Cadastro e login com senha criptografada (bcrypt) e token JWT
- Relatos de problemas com protocolo, foto opcional e apoios
- Mensagens do formulário de contato
- Painel do moderador com status, resposta, exclusão e estatísticas
- Limites de requisição, CORS, Helmet e validação de dados
- Banco SQLite local

### Como rodar

```bash
cd backend
npm install
cp .env.example .env
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copie a saída para `JWT_SECRET` no arquivo `.env` e inicie:

```bash
node criar-moderador.js "Seu Nome" seu@email.com SuaSenhaForte
npm start
```

Depois acesse **http://localhost:3000**. O backend também serve os arquivos do frontend.

Para usar o Live Server no frontend, rode o backend em `http://localhost:3000`; o `app.js` detecta essa porta automaticamente.

### Variáveis do `.env`

| Variável | Para que serve |
|---|---|
| `JWT_SECRET` | Obrigatória, mínimo de 32 caracteres |
| `PORT` | Porta do servidor (padrão 3000) |
| `CORS_ORIGIN` | Endereços do frontend separados por vírgula |
| `PUBLIC_URL` | Endereço público do backend para links das fotos |
| `TRUST_PROXY` | Use `1` atrás de proxy (Render, Railway, VPS etc.) |
| `DB_PATH` | Caminho do banco SQLite (opcional) |

### Rotas da API

| Método | Rota | Acesso |
|---|---|---|
| GET | `/api` | público (status da API) |
| POST | `/auth/cadastro` | público |
| POST | `/auth/login` | público |
| GET | `/minhas-denuncias` | usuário logado |
| DELETE | `/conta` | usuário logado |
| GET | `/denuncias` | público (moderador recebe protocolo) |
| POST | `/denuncias` | público |
| GET | `/denuncias/protocolo/:cod` | público |
| POST | `/denuncias/:id/apoio` | público |
| PATCH | `/denuncias/:id` | moderador |
| DELETE | `/denuncias/:id` | moderador |
| GET | `/estatisticas` | moderador |
| POST | `/contato` | público |
| GET | `/contatos` | moderador |
| PATCH | `/contatos/:id/lido` | moderador |
| DELETE | `/contatos/:id` | moderador |

Tipos de relato aceitos: `lixo`, `queimada`, `desmatamento`, `infraestrutura`, `seguranca` e `outros`.

## Observações

- O conteúdo textual dos atrativos foi reorganizado a partir do material do projeto.
- Antes de visitar os locais, confirme acesso, funcionamento, valores e segurança com os responsáveis.
- Nunca envie o arquivo `.env`, o banco `.db` ou a pasta `uploads/` para o GitHub.
- O `sw.js` não guarda respostas da API; apenas páginas e arquivos estáticos.
