# Escopo do Projeto — Turismo das Araras

## 1. Visão geral

O **Turismo das Araras** é um projeto educacional de um site informativo sobre os atrativos turísticos de Barra do Garças (MT) e do Vale do Araguaia. A proposta é reunir em um único lugar informações sobre cachoeiras, rios, serras, trilhas e lugares culturais da região, além de permitir que o visitante colabore com a gestão desses espaços por meio de relatos de problemas e mensagens de contato.

O sistema é composto por um **frontend multipágina** (HTML, CSS e JavaScript puro) e um **backend** em Node.js/Express com banco SQLite, que também serve os arquivos do site.

## 2. Público-alvo

- Turistas e visitantes que planejam conhecer Barra do Garças e a região do Araguaia.
- Moradores locais que desejam divulgar e preservar os atrativos da região.
- Moderadores responsáveis por receber, avaliar e responder relatos e mensagens.

## 3. Escopo incluído

### 3.1 Conteúdo e navegação (frontend)

- Página inicial com apresentação do projeto e destaques dos destinos.
- Páginas institucionais: **Sobre**, **Notícias** e **Contato**.
- Catálogo de **23 atrativos** cadastrados em `destinos.json`, com página individual para cada ponto turístico (textos descritivos, imagens/galerias quando disponíveis e localização).
- Pesquisa e filtro por categoria no catálogo.
- Páginas de **login**, **cadastro** e **painel do moderador**.
- Menu responsivo para dispositivos móveis.
- Seletor de aparência com as opções **Automático**, **Claro** e **Escuro**, com o tema claro (paleta verde original) como padrão.
- Recursos de PWA: manifesto, ícones, service worker e cache dos arquivos estáticos para funcionamento offline.

### 3.2 Contas e acesso

- Cadastro de usuários com nome, e-mail e senha (hash com bcrypt).
- Login com token JWT, com validade de 7 dias para cidadãos e 8 horas para moderadores.
- Dois papéis: **cidadão** (`cidadao`) e **moderador**.
- Consulta dos próprios relatos e exclusão da conta mediante confirmação de senha.

### 3.3 Relatos de problemas

- Envio de relatos por qualquer visitante, com ou sem conta (opção anônima).
- Tipos aceitos: lixo, queimada, desmatamento, infraestrutura, segurança e outros.
- Campos: local, bairro, descrição, coordenadas e foto opcional (JPG, PNG ou WEBP, até 5 MB).
- Geração de **protocolo** único no formato `TA-XXXXXX` para acompanhamento.
- Consulta pública do andamento pelo protocolo.
- Apoios por visitantes, contabilizados por endereço IP.
- Status: **Recebida**, **Em análise** e **Resolvida**, com resposta do moderador.
- Moderação: atualização de status/resposta e exclusão de relatos.

### 3.4 Contato

- Formulário público com nome, e-mail, assunto (Dúvida, Sugestão, Correção de informação, Outro) e mensagem.
- Listagem, marcação como lido e exclusão de mensagens no painel do moderador.

### 3.5 Painel do moderador e estatísticas

- Autenticação exclusiva para moderadores.
- Painel com abas para relatos e mensagens.
- Estatísticas: total de relatos, relatos dos últimos 7 dias, contagens por tipo, status e bairro, e mensagens não lidas.

### 3.6 Segurança e qualidade

- Validação de todos os dados de entrada no backend.
- Proteção de rotas por token e por papel do usuário.
- Helmet, CORS configurável e limites de requisição por rota.
- Sanitização de dados exibidos no frontend.
- Persistência em SQLite com WAL e chaves estrangeiras ativadas.

### 3.7 Livre de idioma (seletor PT/EN)

- Seletor de idioma disponível em todas as páginas, no canto inferior esquerdo, com as opções **Português (PT)** e **English (EN)**.
- A escolha é salva no navegador (`localStorage`) e aplicada automaticamente nas visitas seguintes.
- Os textos da interface (menu, títulos, botões, rótulos de formulário, mensagens de retorno e atributos de acessibilidade) são traduzidos dinamicamente por `js/i18n.js`, sem recarregar a página.
- O atributo `lang` do documento e o `<title>` acompanham o idioma selecionado.
- Conteúdo gerado depois do carregamento (catálogo, mensagens de status) também é traduzido por observação do DOM.
- Os **66 parágrafos descritivos dos 23 atrativos** e o aviso "Antes de visitar" têm versão em inglês em `frontend/i18n/atrativos-en.json`, aplicada nas páginas individuais e nos cartões do catálogo.

### 3.8 UI/UX

- Layout responsivo com menu colapsável em telas pequenas e controles flutuantes posicionados em lados opostos (idioma à esquerda, aparência à direita).
- Foco visível em links, botões e campos de formulário para navegação por teclado.
- Contraste entre texto e fundo verificado nos temas claro e escuro.
- Respeito à preferência de movimento reduzido do sistema (`prefers-reduced-motion`).
- Recuo de rolagem para cabeçalho fixo (`scroll-margin-top`) e imagens limitadas à largura da tela.
- Menus com papéis ARIA (`radiogroup`/`radio`), estados `aria-checked`/`aria-expanded` e fechamento por `Esc` ou clique fora.

## 4. Fora do escopo

Não fazem parte desta versão do projeto:

- Sistema de reservas, hospedagem, venda de ingressos ou pagamentos online.
- Roteirizador de viagens, recomendação personalizada ou check-in em atrativos.
- Mapas interativos com rotas e navegação em tempo real (o projeto exibe apenas a localização dos pontos).
- Aplicativo nativo para celular (o acesso é via site/PWA).
- Notificações push e envio de e-mails automáticos.
- Tradução das mensagens de erro retornadas pela API; nomes próprios dos locais são mantidos no original.
- Edição do conteúdo dos atrativos pelo painel administrativo.
- Integração com órgãos públicos, prefeitura ou bases oficiais de dados.
- Implantação em produção e configuração de domínio/hospedagem.
- Garantia de veracidade e atualização permanente das informações turísticas; os textos são educativos e devem ser confirmados com fontes locais antes da visita.

## 5. Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+), Service Worker, Web App Manifest, i18n via `js/i18n.js` |
| UI/UX | CSS responsivo, foco visível, ARIA, `prefers-reduced-motion` |
| Backend | Node.js, Express, SQLite (better-sqlite3) |
| Autenticação | JWT (jsonwebtoken) e bcryptjs |
| Segurança | Helmet, CORS, express-rate-limit, multer |
| Configuração | dotenv (variáveis em `.env`) |

## 6. Entregáveis

- Site navegável em `frontend/`, com todas as páginas, o catálogo de atrativos e o seletor de idioma PT/EN.
- API REST em `backend/server.js`, com documentação das rotas no `README.md`.
- Banco de dados SQLite criado automaticamente a partir de `backend/db.js`.
- Script `criar-moderador.js` para criação da conta de moderador.
- Instruções de instalação e execução no `README.md`.
