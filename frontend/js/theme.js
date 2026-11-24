(function () {
  const CHAVE = "ta_tema";
  const OPCOES = [
    { valor: "auto", rotulo: "Automático", icone: "◐", dica: "Segue o tema do aparelho" },
    { valor: "claro", rotulo: "Claro", icone: "☀", dica: "Cores originais do site" },
    { valor: "escuro", rotulo: "Escuro", icone: "☾", dica: "Mesmas cores em fundo escuro" }
  ];
  const midia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  let preferencia = "claro";

  try {
    if (!localStorage.getItem("ta_tema_padrao_claro")) {
      localStorage.removeItem(CHAVE);
      localStorage.setItem("ta_tema_padrao_claro", "1");
    } else {
      const salvo = localStorage.getItem(CHAVE);
      if (OPCOES.some((opcao) => opcao.valor === salvo)) preferencia = salvo;
    }
  } catch (_) {}

  function temaAtivo() {
    return preferencia === "auto" ? (midia && midia.matches ? "escuro" : "claro") : preferencia;
  }

  function aplicar() {
    const ativo = temaAtivo();
    const opcao = OPCOES.find((item) => item.valor === preferencia);
    const raiz = document.documentElement;
    raiz.setAttribute("data-tema", ativo);
    raiz.setAttribute("data-preferencia-tema", preferencia);
    raiz.style.colorScheme = ativo === "escuro" ? "dark" : "light";

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", ativo === "escuro" ? "#103d2c" : "#3bb371");

    const botao = document.querySelector(".ta-theme-button");
    if (botao) botao.setAttribute("aria-label", `Aparência: ${opcao.rotulo} (${opcao.dica})`);
    document.querySelectorAll(".ta-theme-option").forEach((item) => {
      item.setAttribute("aria-checked", String(item.dataset.valor === preferencia));
    });
  }

  function definir(valor) {
    if (!OPCOES.some((opcao) => opcao.valor === valor)) return;
    preferencia = valor;
    try { localStorage.setItem(CHAVE, valor); } catch (_) {}
    aplicar();
  }

  if (midia) {
    if (midia.addEventListener) midia.addEventListener("change", aplicar);
    else if (midia.addListener) midia.addListener(aplicar);
  }
  aplicar();

  document.addEventListener("DOMContentLoaded", () => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "ta-theme-button";
    botao.textContent = "◐";
    botao.setAttribute("aria-haspopup", "true");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", "ta-theme-menu");

    const menu = document.createElement("div");
    menu.className = "ta-theme-menu";
    menu.id = "ta-theme-menu";
    menu.hidden = true;
    menu.setAttribute("role", "radiogroup");
    menu.setAttribute("aria-label", "Aparência do site");

    const titulo = document.createElement("div");
    titulo.className = "ta-theme-titulo";
    titulo.textContent = "Aparência";
    menu.appendChild(titulo);

    OPCOES.forEach((opcao) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "ta-theme-option";
      item.dataset.valor = opcao.valor;
      item.setAttribute("role", "radio");
      item.innerHTML = `<span class="ta-marcador" aria-hidden="true">${opcao.icone}</span><span></span>`;
      item.lastElementChild.textContent = opcao.rotulo;
      item.title = opcao.dica;
      item.addEventListener("click", () => {
        definir(opcao.valor);
        fechar();
      });
      menu.appendChild(item);
    });

    function fechar() {
      menu.hidden = true;
      botao.setAttribute("aria-expanded", "false");
    }

    botao.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      botao.setAttribute("aria-expanded", String(!menu.hidden));
      if (!menu.hidden) menu.querySelector('[aria-checked="true"]')?.focus();
    });

    document.addEventListener("click", (evento) => {
      if (!menu.hidden && !menu.contains(evento.target) && !botao.contains(evento.target)) fechar();
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && !menu.hidden) {
        fechar();
        botao.focus();
      }
    });

    document.body.appendChild(botao);
    document.body.appendChild(menu);
    aplicar();
  });

  window.TA_TEMA = { definir, obter: temaAtivo, preferencia: () => preferencia };
})();
