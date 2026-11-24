const API_URL = window.TA_API_URL ?? (
  location.protocol === "file:" || ["5500", "5501", "8080"].includes(location.port)
    ? "http://localhost:3000"
    : ""
);
const CONTA_KEY = "ta_conta";

function contaSalva() {
  try { return JSON.parse(localStorage.getItem(CONTA_KEY) || "null"); } catch (_) { return null; }
}
function guardarConta(dados) {
  if (dados) localStorage.setItem(CONTA_KEY, JSON.stringify(dados));
  else localStorage.removeItem(CONTA_KEY);
}
function escapar(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function campo(form, nome) {
  return form.elements.namedItem(nome);
}
async function api(caminho, opcoes = {}) {
  const headers = { "Content-Type": "application/json", ...(opcoes.headers || {}) };
  const sessao = contaSalva();
  if (sessao?.token) headers.Authorization = "Bearer " + sessao.token;
  const resposta = await fetch(API_URL + caminho, { ...opcoes, headers });
  if (resposta.status === 204) return null;
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(corpo.erro || "Não foi possível concluir a operação.");
  return corpo;
}

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton"), nav = document.getElementById("mainNav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const aberto = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(aberto));
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const conta = contaSalva();
  const linkConta = document.querySelector(".nav-account");
  if (linkConta && conta?.usuario) {
    linkConta.textContent = `Sair (${conta.usuario.nome.split(" ")[0]})`;
    linkConta.href = "#";
    linkConta.addEventListener("click", (e) => {
      e.preventDefault();
      guardarConta(null);
      location.reload();
    });
  }

  const grid = document.getElementById("catalogGrid");
  if (grid) {
    fetch("destinos.json").then((r) => {
      if (!r.ok) throw new Error("Não foi possível carregar o catálogo.");
      return r.json();
    }).then((items) => {
      const search = document.getElementById("searchInput"), filter = document.getElementById("categoryFilter");
      const count = document.getElementById("resultsCount"), empty = document.getElementById("emptyState");
      const render = () => {
        const term = search.value.toLocaleLowerCase().trim(), cat = filter.value;
        const found = items.filter((x) => {
          const en = window.TA_IDIOMA?.cartaoAtrativo?.(x);
          const texto = `${x.name} ${x.paragraphs.join(" ")} ${en ? `${en.name} ${en.paragraph}` : ""}`.toLocaleLowerCase();
          return texto.includes(term) && (cat === "all" || x.categories.includes(cat));
        });
        grid.innerHTML = found.map((x) => {
          const en = window.TA_IDIOMA?.cartaoAtrativo?.(x);
          const nome = en ? en.name : x.name;
          const resumo = (en ? en.paragraph : (x.paragraphs[0] || "Conheça este atrativo da região.")).slice(0, 165);
          return `<a class="catalog-card" href="${escapar(x.file)}"><span class="card-index">${String(items.indexOf(x) + 1).padStart(2, "0")} / ${x.categories.map((c) => c.toUpperCase()).join(" · ")}</span><h3>${escapar(nome)}</h3><p>${escapar(resumo)}...</p><span class="card-arrow">Ver informações ↗</span></a>`;
        }).join("");
        const contador = window.TA_IDIOMA?.traduzir?.(found.length === 1 ? "destino encontrado" : "destinos encontrados") ?? (found.length === 1 ? "destino encontrado" : "destinos encontrados");
        count.textContent = `${found.length} ${contador}`;
        empty.hidden = found.length !== 0;
      };
      search.addEventListener("input", render);
      filter.addEventListener("change", render);
      document.addEventListener("ta-idioma", render);
      render();
      Promise.resolve(window.TA_IDIOMA?.pronto).then(render);
    }).catch(() => {
      grid.innerHTML = "<p>Não foi possível carregar os destinos. Abra o site por um servidor local.</p>";
    });
  }

  const login = document.getElementById("loginForm");
  if (login) login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = document.getElementById("loginFeedback");
    const email = campo(login, "email").value.trim(), senha = campo(login, "password").value;
    const botao = login.querySelector("button[type=submit]");
    botao.disabled = true;
    feedback.textContent = "Entrando...";
    try {
      const dados = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, senha }) });
      guardarConta(dados);
      feedback.textContent = "Login realizado com sucesso. Redirecionando...";
      location.href = dados.usuario?.papel === "moderador" ? "admin.html" : "index.html";
    } catch (err) {
      feedback.textContent = err.message;
      botao.disabled = false;
    }
  });

  const register = document.getElementById("registerForm");
  if (register) register.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = document.getElementById("registerFeedback");
    const nome = campo(register, "name").value.trim(), email = campo(register, "email").value.trim();
    const senha = campo(register, "password").value, confirmar = campo(register, "confirmPassword").value;
    if (senha !== confirmar) {
      feedback.textContent = "As senhas não coincidem.";
      return;
    }
    const botao = register.querySelector("button[type=submit]");
    botao.disabled = true;
    feedback.textContent = "Criando conta...";
    try {
      const dados = await api("/auth/cadastro", { method: "POST", body: JSON.stringify({ nome, email, senha }) });
      guardarConta(dados);
      feedback.textContent = "Cadastro realizado com sucesso. Redirecionando...";
      location.href = "index.html";
    } catch (err) {
      feedback.textContent = err.message;
      botao.disabled = false;
    }
  });

  const contact = document.getElementById("contactForm");
  if (contact) contact.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = document.getElementById("contactFeedback");
    const botao = contact.querySelector("button[type=submit]");
    botao.disabled = true;
    feedback.textContent = "Enviando mensagem...";
    try {
      const dados = {
        nome: campo(contact, "name").value.trim(),
        email: campo(contact, "email").value.trim(),
        assunto: campo(contact, "subject").value,
        mensagem: campo(contact, "message").value.trim()
      };
      const resposta = await api("/contato", { method: "POST", body: JSON.stringify(dados) });
      feedback.textContent = resposta.mensagem || "Mensagem enviada com sucesso.";
      contact.reset();
    } catch (err) {
      feedback.textContent = err.message;
    } finally {
      botao.disabled = false;
    }
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  window.TA = { API_URL, api, contaSalva, guardarConta };
});
