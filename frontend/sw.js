const VERSAO = "ta-v10";
const PAGINAS = [
  "admin.html",
  "aguasquentes.html",
  "azuldasaguas.html",
  "cachoeiraazul.html",
  "cachoeiracristal.html",
  "cachoeiradaserra.html",
  "cachoeiradausina.html",
  "cadastro.html",
  "caniondosipo.html",
  "complexodobateia.html",
  "contato.html",
  "cristoredentor.html",
  "destinos.html",
  "discoporto.html",
  "favodemal.html",
  "index.html",
  "login.html",
  "mirantedoamor.html",
  "noticias.html",
  "pezinhos.html",
  "portodobae.html",
  "praiadobosque.html",
  "rioaraguaia.html",
  "riogacas.html",
  "riosaraguaia.html",
  "santuarioararas.html",
  "serraazul.html",
  "serradoroncador.html",
  "sobre.html",
  "solnascente.html",
  "trilhadabarra.html"
];
const ARQUIVOS = [
  "./",
  ...PAGINAS,
  "css/style.css",
  "css/admin.css",
  "css/theme.css",
  "js/app.js",
  "js/admin.js",
  "js/theme.js",
  "js/i18n.js",
  "destinos.json",
  "i18n/atrativos-en.json",
  "manifest.webmanifest",
  "icone.svg",
  "icone-192.png",
  "icone-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSAO)
      .then((cache) => Promise.all(ARQUIVOS.map((arquivo) => cache.add(arquivo).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((chave) => chave !== VERSAO).map((chave) => caches.delete(chave))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const requisicao = e.request;
  const url = new URL(requisicao.url);
  if (requisicao.method !== "GET" || url.origin !== location.origin) return;
  if (/\/(auth|denuncias|minhas-denuncias|conta|estatisticas|contatos|uploads)(\/|$)/.test(url.pathname)) return;

  if (requisicao.mode === "navigate") {
    e.respondWith(
      fetch(requisicao)
        .then((resposta) => {
          if (resposta.ok) {
            const copia = resposta.clone();
            caches.open(VERSAO).then((cache) => cache.put(requisicao, copia));
          }
          return resposta;
        })
        .catch(() => caches.match(requisicao).then((cached) => cached || caches.match("index.html")))
    );
    return;
  }

  if (!/\.(css|js|json|svg|webmanifest)$/.test(url.pathname)) return;
  e.respondWith(
    caches.match(requisicao).then((cached) => cached || fetch(requisicao).then((resposta) => {
      if (resposta.ok) {
        const copia = resposta.clone();
        caches.open(VERSAO).then((cache) => cache.put(requisicao, copia));
      }
      return resposta;
    }))
  );
});
