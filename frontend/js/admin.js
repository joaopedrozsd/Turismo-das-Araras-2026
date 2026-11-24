const API_URL = window.TA_API_URL ?? (
  location.protocol === "file:" || ["5500", "5501", "8080"].includes(location.port)
    ? "http://localhost:3000"
    : ""
);
const SESSAO_KEY = "ta_admin";
const STATUS = ["Recebida", "Em análise", "Resolvida"];
const TIPOS = {
  lixo: { nome: "Lixo", cor: "#2F8F5B" },
  queimada: { nome: "Queimada", cor: "#E4572E" },
  desmatamento: { nome: "Desmatamento", cor: "#8A6D3B" },
  infraestrutura: { nome: "Infraestrutura", cor: "#2B7A9B" },
  seguranca: { nome: "Segurança", cor: "#6B5CA5" },
  outros: { nome: "Outros", cor: "#5B6E72" }
};

let sessao = null, dados = [], mensagens = [], filtroStatus = "todos", termo = "";
const $ = (id) => document.getElementById(id);

function esc(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function quando(iso) {
  const minutos = Math.round((Date.now() - new Date(iso)) / 6e4);
  if (minutos < 1) return "agora";
  if (minutos < 60) return `há ${minutos} min`;
  const horas = Math.round(minutos / 60);
  if (horas < 24) return `há ${horas} h`;
  return `há ${Math.round(horas / 24)} d`;
}
function aviso(id, texto, tipo) {
  const el = $(id);
  el.textContent = texto;
  el.className = "form-feedback " + (tipo || "");
}
function cab() {
  return { "Content-Type": "application/json", Authorization: "Bearer " + sessao.token };
}
async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(API_URL + caminho, { ...opcoes, headers: { ...cab(), ...(opcoes.headers || {}) } });
  if (resposta.status === 204) return null;
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const erro = new Error(corpo.erro || "Não foi possível concluir a operação.");
    erro.status = resposta.status;
    throw erro;
  }
  return corpo;
}

async function login(email, senha) {
  const resposta = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(corpo.erro || "Não foi possível entrar. Tente de novo.");
  return corpo;
}

async function carregar() {
  dados = await requisicao("/denuncias");
}
async function carregarContatos() {
  mensagens = await requisicao("/contatos");
}
async function salvar(id, status, resposta) {
  const atualizada = await requisicao(`/denuncias/${id}`, { method: "PATCH", body: JSON.stringify({ status, resposta }) });
  const item = dados.find((d) => d.id == id);
  if (item) Object.assign(item, atualizada);
}
async function apagar(id) {
  await requisicao(`/denuncias/${id}`, { method: "DELETE" });
  dados = dados.filter((d) => d.id != id);
}
async function marcarMensagem(id, lido) {
  await requisicao(`/contatos/${id}/lido`, { method: "PATCH", body: JSON.stringify({ lido }) });
  const item = mensagens.find((m) => m.id == id);
  if (item) item.lido = lido ? 1 : 0;
}
async function apagarMensagem(id) {
  await requisicao(`/contatos/${id}`, { method: "DELETE" });
  mensagens = mensagens.filter((m) => m.id != id);
}

function entrar(dadosSessao) {
  sessao = dadosSessao;
  sessionStorage.setItem(SESSAO_KEY, JSON.stringify(dadosSessao));
  $("tela-login").hidden = true;
  $("tela-painel").hidden = false;
  $("ola").textContent = `Olá, ${dadosSessao.usuario.nome}. Analise os relatos e as mensagens recebidas pelo site.`;
  Promise.all([carregar(), carregarContatos()])
    .then(() => { desenhar(); desenharMensagens(); })
    .catch((e) => {
      if (e.status === 401 || e.status === 403) {
        sair();
        aviso("msg-login", "Sessão expirada. Entre novamente.", "erro");
        return;
      }
      aviso("msg-painel", e.message, "erro");
    });
}
function sair() {
  sessao = null;
  dados = [];
  mensagens = [];
  sessionStorage.removeItem(SESSAO_KEY);
  $("tela-painel").hidden = true;
  $("tela-login").hidden = false;
  aviso("msg-login", "");
}

function desenhar() {
  const contar = (status) => dados.filter((d) => (d.status || "Recebida") === status).length;
  $("resumo").innerHTML =
    `<div><strong>${dados.length}</strong><span>Total de relatos</span></div>` +
    STATUS.map((s) => `<div><strong>${contar(s)}</strong><span>${s}</span></div>`).join("");

  const opcoes = [["todos", "Todas"], ...STATUS.map((s) => [s, s])];
  $("filtros-status").innerHTML = opcoes.map(([valor, nome]) =>
    `<button type="button" class="chip" data-s="${esc(valor)}" aria-pressed="${filtroStatus === valor}">${nome}</button>`).join("");

  const busca = termo.toLowerCase();
  const itens = dados.filter((d) =>
    (filtroStatus === "todos" || (d.status || "Recebida") === filtroStatus) &&
    (!busca || (d.local || "").toLowerCase().includes(busca) || (d.descricao || "").toLowerCase().includes(busca)));

  if (!itens.length) {
    $("lista-admin").innerHTML = `<div class="vazio">Nenhum relato encontrado com esses filtros.</div>`;
    return;
  }

  $("lista-admin").innerHTML = itens.map((d) => {
    const tipo = TIPOS[d.tipo] || TIPOS.outros;
    const status = d.status || "Recebida";
    return `<article class="admin-item" style="--c:${tipo.cor}" data-id="${esc(d.id)}">
      <h3><span>${tipo.nome}</span><span class="status">${esc(status)}</span></h3>
      <p>${esc(d.descricao)}</p>
      ${d.foto ? `<img src="${esc(d.foto)}" alt="Foto do relato" loading="lazy">` : ""}
      <small>${esc(d.local || "Local não informado")}${d.bairro ? " · " + esc(d.bairro) : ""} · ${quando(d.criado_em)}</small>
      ${d.protocolo ? `<br><small>Protocolo: <strong>${esc(d.protocolo)}</strong></small>` : ""}
      ${d.resposta ? `<div class="resposta"><strong>Resposta:</strong> ${esc(d.resposta)}</div>` : ""}
      <div class="admin-actions">
        <div class="row">
          <label for="st-${esc(d.id)}" style="margin:0;font-size:11px">Status</label>
          <select id="st-${esc(d.id)}">${STATUS.map((s) => `<option ${s === status ? "selected" : ""}>${s}</option>`).join("")}</select>
        </div>
        <textarea id="rs-${esc(d.id)}" placeholder="Resposta para o autor do relato (opcional)">${esc(d.resposta || "")}</textarea>
        <div class="row">
          <button type="button" class="btn" data-acao="salvar">Salvar alterações</button>
          <button type="button" class="btn perigo" data-acao="apagar">Apagar</button>
        </div>
      </div>
    </article>`;
  }).join("");

  const naoLidas = mensagens.filter((m) => !m.lido).length;
  const badge = $("badge-mensagens");
  badge.hidden = naoLidas === 0;
  badge.textContent = naoLidas;
}

function desenharMensagens() {
  const naoLidas = mensagens.filter((m) => !m.lido).length;
  const badge = $("badge-mensagens");
  badge.hidden = naoLidas === 0;
  badge.textContent = naoLidas;

  if (!mensagens.length) {
    $("lista-mensagens").innerHTML = `<div class="vazio">Nenhuma mensagem de contato recebida.</div>`;
    return;
  }

  $("lista-mensagens").innerHTML = mensagens.map((m) => `
    <article class="admin-item mensagem-item ${m.lido ? "" : "nao-lida"}" style="--c:${m.lido ? "#3bb371" : "#E4572E"}" data-id="${esc(m.id)}">
      <h3><span class="assunto">${esc(m.assunto)}</span><span class="status">${m.lido ? "Lida" : "Nova"}</span></h3>
      <p>${esc(m.mensagem)}</p>
      <small>${esc(m.nome)} · ${esc(m.email)} · ${quando(m.criado_em)}</small>
      <div class="row" style="margin-top:11px">
        <button type="button" class="btn secundario" data-acao="lida">${m.lido ? "Marcar como nova" : "Marcar como lida"}</button>
        <button type="button" class="btn perigo" data-acao="apagar">Apagar</button>
      </div>
    </article>`).join("");
}

const menuButton = $("menuButton"), nav = $("mainNav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(aberto));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
}

$("form-login").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = $("email").value.trim(), senha = $("senha").value;
  if (!email || !senha) return aviso("msg-login", "Preencha e-mail e senha.", "erro");
  const botao = $("btn-login");
  botao.disabled = true;
  aviso("msg-login", "Entrando...");
  try {
    const resultado = await login(email, senha);
    if (resultado.usuario?.papel !== "moderador") throw new Error("Esta conta não tem acesso ao painel.");
    $("form-login").reset();
    aviso("msg-login", "");
    entrar(resultado);
  } catch (err) {
    aviso("msg-login", err.message, "erro");
  } finally {
    botao.disabled = false;
  }
});

$("btn-sair").addEventListener("click", sair);
$("busca").addEventListener("input", (e) => { termo = e.target.value; desenhar(); });
$("filtros-status").addEventListener("click", (e) => {
  const botao = e.target.closest("[data-s]");
  if (!botao) return;
  filtroStatus = botao.dataset.s;
  desenhar();
});

document.querySelectorAll(".admin-tabs [data-tab]").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".admin-tabs [data-tab]").forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
    $("tab-relatos").hidden = botao.dataset.tab !== "relatos";
    $("tab-mensagens").hidden = botao.dataset.tab !== "mensagens";
  });
});

$("lista-admin").addEventListener("click", async (e) => {
  const botao = e.target.closest("[data-acao]");
  if (!botao) return;
  const item = botao.closest(".admin-item");
  const id = item.dataset.id;
  botao.disabled = true;
  try {
    if (botao.dataset.acao === "salvar") {
      await salvar(id, $("st-" + id).value, $("rs-" + id).value.trim());
      aviso("msg-painel", "Alterações salvas.", "ok");
    } else {
      if (!confirm("Apagar este relato? Isso não pode ser desfeito.")) {
        botao.disabled = false;
        return;
      }
      await apagar(id);
      aviso("msg-painel", "Relato apagado.", "ok");
    }
    desenhar();
  } catch (err) {
    aviso("msg-painel", err.message, "erro");
    botao.disabled = false;
  }
});

$("lista-mensagens").addEventListener("click", async (e) => {
  const botao = e.target.closest("[data-acao]");
  if (!botao) return;
  const item = botao.closest(".admin-item");
  const id = item.dataset.id;
  const mensagem = mensagens.find((m) => m.id == id);
  botao.disabled = true;
  try {
    if (botao.dataset.acao === "lida") {
      await marcarMensagem(id, !mensagem.lido);
      aviso("msg-painel", "Mensagem atualizada.", "ok");
    } else {
      if (!confirm("Apagar esta mensagem?")) {
        botao.disabled = false;
        return;
      }
      await apagarMensagem(id);
      aviso("msg-painel", "Mensagem apagada.", "ok");
    }
    desenharMensagens();
    desenhar();
  } catch (err) {
    aviso("msg-painel", err.message, "erro");
    botao.disabled = false;
  }
});

try {
  const salva = JSON.parse(sessionStorage.getItem(SESSAO_KEY) || "null");
  if (salva) entrar(salva);
} catch (_) {}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
