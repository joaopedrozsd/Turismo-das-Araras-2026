(function () {
  const CHAVE = "ta_idioma";
  const OPCOES = [
    { valor: "pt", rotulo: "Português", sigla: "PT" },
    { valor: "en", rotulo: "English", sigla: "EN" }
  ];

  const TEXTOS = {
    "Início": "Home",
    "Contato": "Contact",
    "Pontos turísticos": "Tourist spots",
    "Sobre": "About",
    "Entrar": "Sign in",
    "Entrar →": "Sign in →",
    "Sair": "Sign out",
    "Destinos": "Destinations",
    "Notícias": "News",
    "Sobre o projeto": "About the project",
    "Conhecer, valorizar e preservar.": "Discover, value and preserve.",
    "Projeto educacional • Consulte fontes locais para confirmar horários, valores e condições de visita.": "Educational project • Check local sources to confirm opening hours, prices and visiting conditions.",
    "← Voltar aos destinos": "← Back to destinations",
    "← Voltar ao início": "← Back to home",
    "Conheça um pouco mais sobre este atrativo de Barra do Garças e região.": "Learn a little more about this attraction in Barra do Garças and the region.",
    "SOBRE O DESTINO": "ABOUT THE DESTINATION",
    "Conheça o lugar": "Discover the place",
    "Antes de visitar": "Before you visit",
    "Ver outros destinos": "See other destinations",
    "Turismo consciente": "Responsible tourism",
    "Respeite as orientações do local, preserve a natureza e mantenha os espaços limpos para os próximos visitantes.": "Follow local guidelines, preserve nature and keep the areas clean for future visitors.",
    "Fale com o projeto →": "Contact the project →",
    "Natureza": "Nature",
    "Aventura": "Adventure",
    "Cultura": "Culture",
    "Lazer": "Leisure",
    "NATUREZA": "NATURE",
    "AVENTURA": "ADVENTURE",
    "CULTURA": "CULTURE",
    "LAZER": "LEISURE",
    "Conhecer destino ↗": "Explore destination ↗",
    "FALE CONOSCO": "CONTACT US",
    "Entre em": "Get in",
    "contato.": "touch.",
    "Envie uma dúvida, sugestão ou informação sobre os atrativos turísticos.": "Send a question, suggestion or information about the tourist attractions.",
    "Envie sua mensagem": "Send your message",
    "Nome": "Name",
    "Nome completo": "Full name",
    "E-mail": "Email",
    "Senha": "Password",
    "Assunto": "Subject",
    "Selecione": "Select",
    "Dúvida": "Question",
    "Sugestão": "Suggestion",
    "Correção de informação": "Information correction",
    "Outro": "Other",
    "Mensagem": "Message",
    "Enviar mensagem →": "Send message →",
    "SOBRE O FORMULÁRIO": "ABOUT THE FORM",
    "Quer contribuir?": "Want to contribute?",
    "Sugestões e correções ajudam a manter o conteúdo do projeto mais claro e organizado.": "Suggestions and corrections help keep the project content clear and organized.",
    "As mensagens são armazenadas no servidor e podem ser lidas no painel de moderação.": "Messages are stored on the server and can be read in the moderation panel.",
    "CATÁLOGO TURÍSTICO": "TOURIST CATALOG",
    "Encontre seu": "Find your",
    "próximo destino.": "next destination.",
    "Pesquise por nome ou escolha uma categoria para explorar os atrativos.": "Search by name or choose a category to explore the attractions.",
    "Todas as categorias": "All categories",
    "Nenhum destino encontrado. Experimente outra pesquisa.": "No destinations found. Try another search.",
    "Ver informações ↗": "View details ↗",
    "destino encontrado": "destination found",
    "destinos encontrados": "destinations found",
    "FAÇA SEU CADASTRO": "CREATE YOUR ACCOUNT",
    "Crie sua": "Create your",
    "conta.": "account.",
    "Preencha seus dados para iniciar seu cadastro no portal.": "Fill in your details to register on the portal.",
    "CADASTRO": "REGISTRATION",
    "Seus dados": "Your details",
    "Confirmar senha": "Confirm password",
    "Criar cadastro →": "Create account →",
    "Já tem conta?": "Already have an account?",
    "Sua senha é armazenada como hash no servidor. Use uma senha forte e exclusiva.": "Your password is stored as a hash on the server. Use a strong, unique password.",
    "ÁREA DO USUÁRIO": "USER AREA",
    "Bem-vindo": "Welcome",
    "de volta.": "back.",
    "Acesse sua conta do Turismo das Araras.": "Sign in to your Turismo das Araras account.",
    "ENTRAR": "SIGN IN",
    "Acesse sua conta": "Sign in to your account",
    "Ainda não tem conta?": "Don't have an account?",
    "Cadastre-se": "Sign up",
    "Moderadores podem acessar o": "Moderators can access the",
    "painel de moderação": "moderation panel",
    "Área do usuário": "User area",
    "ACESSO RESTRITO": "RESTRICTED ACCESS",
    "Entre com uma conta de moderador para analisar relatos e mensagens.": "Sign in with a moderator account to review reports and messages.",
    "Entrar no painel →": "Open the panel →",
    "Não tem uma conta de moderador? Crie com": "No moderator account? Create one with",
    "no backend.": "in the backend.",
    "MODERAÇÃO": "MODERATION",
    "Painel do moderador": "Moderator panel",
    "Painel do Turismo das Araras": "Turismo das Araras panel",
    "Relatos": "Reports",
    "Mensagens": "Messages",
    "Painel restrito • Uso interno do projeto.": "Restricted panel • Internal project use.",
    "QUEM SOMOS": "WHO WE ARE",
    "Sobre o": "About the",
    "Turismo das Araras.": "Turismo das Araras.",
    "Um projeto para valorizar os atrativos de Barra do Garças e do Vale do Araguaia.": "A project to highlight the attractions of Barra do Garças and the Araguaia Valley.",
    "NOSSA HISTÓRIA": "OUR STORY",
    "Informação, turismo e preservação.": "Information, tourism and preservation.",
    "Conhecer.": "Discover.",
    "Valorizar.": "Value.",
    "Preservar.": "Preserve.",
    "O cuidado com a região também faz parte da experiência turística.": "Caring for the region is also part of the tourism experience.",
    "OBJETIVO": "GOAL",
    "Valorizar o que é nosso.": "Value what is ours.",
    "Divulgar a região, apoiar a descoberta dos atrativos locais e incentivar atitudes responsáveis durante as visitas.": "Promote the region, support the discovery of local attractions and encourage responsible behaviour during visits.",
    "Explorar destinos →": "Explore destinations →",
    "INFORMAÇÃO E ATUALIZAÇÕES": "INFORMATION AND UPDATES",
    "Notícias e": "News and",
    "informações úteis.": "useful information.",
    "Orientações para organizar passeios e acompanhar assuntos relacionados ao turismo regional.": "Guidelines for planning trips and following regional tourism topics.",
    "DICA DE PLANEJAMENTO": "PLANNING TIP",
    "Confira as condições antes de visitar um atrativo": "Check conditions before visiting an attraction",
    "Informação permanente • Turismo consciente": "Permanent information • Responsible tourism",
    "PRESERVAÇÃO AMBIENTAL": "ENVIRONMENTAL PRESERVATION",
    "Pequenas atitudes ajudam a proteger a região": "Small actions help protect the region",
    "Informação permanente • Meio ambiente": "Permanent information • Environment",
    "VALE DO ARAGUAIA": "ARAGUAIA VALLEY",
    "Conheça os atrativos com responsabilidade": "Discover the attractions responsibly",
    "Informação permanente • Segurança": "Permanent information • Safety",
    "Esta página apresenta dicas gerais do projeto e não funciona como portal de notícias em tempo real.": "This page presents general project tips and is not a real-time news portal.",
    "EXPLORE • CONHEÇA • PRESERVE": "EXPLORE • DISCOVER • PRESERVE",
    "um destino de descobertas.": "a destination of discoveries.",
    "Conheça o projeto": "Learn about the project",
    "Cerrado e paisagens": "Cerrado and landscapes",
    "Trilhas e descobertas": "Trails and discoveries",
    "Histórias da região": "Stories of the region",
    "VALE DO": "ARAGUAIA",
    "ARAGUAIA": "VALLEY",
    "Informação para descobrir a região com respeito e responsabilidade.": "Information to discover the region with respect and responsibility.",
    "DESCUBRA A REGIÃO": "DISCOVER THE REGION",
    "Destinos em destaque": "Featured destinations",
    "Alguns lugares que fazem parte da identidade turística de Barra do Garças.": "Some places that are part of Barra do Garças' tourism identity.",
    "Ver todos os destinos →": "See all destinations →",
    "01 / NATUREZA": "01 / NATURE",
    "02 / LAZER": "02 / LEISURE",
    "03 / AVENTURA": "03 / ADVENTURE",
    "Parque Estadual": "State Park",
    "da Serra Azul": "of Serra Azul",
    "Trilhas, mirantes e paisagens do Cerrado.": "Trails, viewpoints and Cerrado landscapes.",
    "Parque das": "Park of",
    "Águas Quentes": "Hot Springs",
    "Um espaço conhecido pelas águas termais.": "A place known for its thermal waters.",
    "Formações naturais e histórias da região.": "Natural formations and stories of the region.",
    "NOSSA PROPOSTA": "OUR PROPOSAL",
    "O turismo começa": "Tourism begins",
    "com a informação.": "with information.",
    "Saiba mais": "Learn more",
    "VIAJE COM RESPONSABILIDADE": "TRAVEL RESPONSIBLY",
    "Conhecer também é preservar.": "Discovering is also preserving.",
    "Planeje a visita": "Plan your visit",
    "Confirme acesso, horários, valores e condições do local antes de sair.": "Confirm access, opening hours, prices and local conditions before you go.",
    "Respeite a natureza": "Respect nature",
    "Não deixe lixo, não retire plantas e observe os animais sem interferir.": "Don't leave litter, don't remove plants and observe animals without interfering.",
    "Cuide da segurança": "Stay safe",
    "Siga as orientações locais e evite áreas ou atividades de risco.": "Follow local guidance and avoid risky areas or activities.",
    "Entrando...": "Signing in...",
    "Login realizado com sucesso. Redirecionando...": "Signed in successfully. Redirecting...",
    "As senhas não coincidem.": "Passwords do not match.",
    "Criando conta...": "Creating account...",
    "Cadastro realizado com sucesso. Redirecionando...": "Account created successfully. Redirecting...",
    "Enviando mensagem...": "Sending message...",
    "Mensagem enviada com sucesso.": "Message sent successfully.",
    "Não foi possível concluir a operação.": "Could not complete the operation.",
    "Não foi possível carregar os destinos. Abra o site por um servidor local.": "Could not load the destinations. Open the site through a local server.",
    "Não foi possível carregar o catálogo.": "Could not load the catalog.",
    "Aparência": "Appearance",
    "Automático": "Auto",
    "Claro": "Light",
    "Escuro": "Dark",
    "Segue o tema do aparelho": "Follows the device theme",
    "Cores originais do site": "Original site colors",
    "Mesmas cores em fundo escuro": "Same colors on a dark background",
    "As condições de acesso, funcionamento, valores e regras podem mudar. Confirme as informações com responsáveis ou órgãos locais antes de realizar o passeio.": "Access conditions, opening hours, prices and rules may change. Confirm the information with local managers or authorities before your visit.",
    "O site Turismo das Araras foi criado com o objetivo de valorizar e divulgar os principais pontos turísticos de Barra do Garças, no estado de Mato Grosso. A plataforma apresenta atrativos naturais, culturais e históricos da região, como cachoeiras, serras, rios, trilhas ecológicas e águas termais.": "The Turismo das Araras website was created to highlight and promote the main tourist attractions of Barra do Garças, in the state of Mato Grosso. The platform showcases the region's natural, cultural and historical attractions, such as waterfalls, mountain ranges, rivers, ecological trails and hot springs.",
    "Além de incentivar o turismo regional, o projeto busca conscientizar sobre a importância da preservação do Cerrado, dos rios, das áreas de mata nativa e da biodiversidade. Muitos atrativos dependem diretamente da conservação ambiental para continuarem existindo e recebendo visitantes.": "In addition to encouraging regional tourism, the project raises awareness about the importance of preserving the Cerrado, rivers, native forest areas and biodiversity. Many attractions depend directly on environmental conservation to keep existing and welcoming visitors.",
    "A proposta é reunir informações em um espaço simples, organizado e acessível, facilitando a descoberta dos destinos e incentivando uma visita responsável.": "The aim is to bring information together in a simple, organized and accessible space, making it easier to discover destinations and encouraging responsible visits.",
    "O Turismo das Araras reúne informações sobre os atrativos locais para ajudar moradores e visitantes a conhecerem a região. Nosso objetivo é incentivar a valorização cultural e a preservação ambiental.": "Turismo das Araras gathers information about local attractions to help residents and visitors discover the region. Our goal is to encourage cultural appreciation and environmental preservation.",
  };

  const ATRIBUTOS = {
    placeholder: {
      "Buscar por local ou descrição...": "Search by place or description...",
      "Digite a senha novamente": "Enter the password again",
      "Digite sua senha": "Enter your password",
      "Escreva sua mensagem...": "Write your message...",
      "Mínimo de 8 caracteres": "Minimum 8 characters",
      "Pesquisar ponto turístico...": "Search tourist spot...",
      "Seu nome": "Your name"
    },
    title: {
      "Segue o tema do aparelho": "Follows the device theme",
      "Cores originais do site": "Original site colors",
      "Mesmas cores em fundo escuro": "Same colors on a dark background"
    },
    "aria-label": {
      "Abrir menu": "Open menu",
      "Buscar relatos": "Search reports",
      "Fechar imagem": "Close image",
      "Filtrar categoria": "Filter category",
      "Pesquisar ponto turístico": "Search tourist spot"
    }
  };

  const PALAVRAS = { NATUREZA: "NATURE", LAZER: "LEISURE", AVENTURA: "ADVENTURE", CULTURA: "CULTURE" };
  const originaisTexto = new WeakMap();
  const originaisAtributo = new WeakMap();
  const externos = new WeakSet();
  let idioma = "pt";
  let atrativosEn = null;

  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "pt" || salvo === "en") idioma = salvo;
  } catch (_) {}

  function traduzirFrase(texto) {
    if (idioma === "pt") return texto;
    const chave = texto.trim();
    if (TEXTOS[chave]) return texto.replace(chave, TEXTOS[chave]);
    if (chave.startsWith("Aparência: ")) {
      return texto
        .replace("Aparência:", "Appearance:")
        .replace("Automático", "Auto")
        .replace("Claro", "Light")
        .replace("Escuro", "Dark")
        .replace("Segue o tema do aparelho", "Follows the device theme")
        .replace("Cores originais do site", "Original site colors")
        .replace("Mesmas cores em fundo escuro", "Same colors on a dark background");
    }
    if (/^(\d+)\s+destinos?\s+encontrados?$/i.test(chave)) {
      return texto.replace(chave, chave.replace(/destino(s)?\s+encontrados?/i, (_, p) => p ? "destinations found" : "destination found"));
    }
    if (/^Sair \(/.test(chave)) return texto.replace("Sair (", "Sign out (");
    if (/^[A-ZÀ-Ú·\s]+$/.test(chave) && Object.keys(PALAVRAS).some((p) => chave.includes(p))) {
      return texto.replace(/NATUREZA|LAZER|AVENTURA|CULTURA/g, (p) => PALAVRAS[p]);
    }
    return texto;
  }

  function aplicarTexto(no) {
    if (externos.has(no)) return;
    if (!originaisTexto.has(no)) originaisTexto.set(no, no.nodeValue);
    const original = originaisTexto.get(no);
    const resultado = traduzirFrase(original);
    if (no.nodeValue !== resultado) no.nodeValue = resultado;
  }

  function percorrer(root) {
    if (!root || root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(no) {
        const pai = no.parentElement;
        if (!pai || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(pai.tagName)) return NodeFilter.FILTER_REJECT;
        if (pai.closest(".ta-lang-button, .ta-lang-menu")) return NodeFilter.FILTER_REJECT;
        return no.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    let no;
    while ((no = walker.nextNode())) aplicarTexto(no);

    const elementos = root.querySelectorAll ? root.querySelectorAll("*") : [];
    elementos.forEach((el) => {
      if (el.closest(".ta-lang-button, .ta-lang-menu")) return;
      if (!originaisAtributo.has(el)) originaisAtributo.set(el, {});
      const guardados = originaisAtributo.get(el);
      Object.keys(ATRIBUTOS).forEach((nome) => {
        if (!el.hasAttribute(nome)) return;
        if (guardados[nome] === undefined) guardados[nome] = el.getAttribute(nome);
        const original = guardados[nome];
        const traducao = idioma === "en" ? ATRIBUTOS[nome][original] : null;
        const valor = traducao || original;
        if (el.getAttribute(nome) !== valor) el.setAttribute(nome, valor);
      });
    });
  }

  function dadosAtrativo(arquivo) {
    return idioma === "en" && atrativosEn ? atrativosEn[arquivo] : null;
  }

  function cartaoAtrativo(item) {
    const traducao = dadosAtrativo(item.file);
    if (!traducao) return null;
    return { name: traducao.name, paragraph: traducao.paragraphs[0] || item.paragraphs[0] };
  }

  function aplicarAtrativos() {
    const arquivo = location.pathname.split("/").pop() || "index.html";
    const traducao = dadosAtrativo(arquivo);
    const paragrafos = document.querySelectorAll(".detail-copy > p");
    paragrafos.forEach((paragrafo, indice) => {
      const no = paragrafo.firstChild;
      if (!no || no.nodeType !== 3) return;
      if (!originaisTexto.has(no)) originaisTexto.set(no, no.nodeValue);
      if (traducao && traducao.paragraphs[indice]) {
        no.nodeValue = traducao.paragraphs[indice];
        externos.add(no);
      } else {
        externos.delete(no);
        no.nodeValue = originaisTexto.get(no);
      }
    });
  }

  function aplicar() {
    document.documentElement.lang = idioma === "en" ? "en" : "pt-BR";
    document.title = traduzirFrase(originaisTitulo || document.title);
    percorrer(document.body);
    aplicarAtrativos();
    const botao = document.querySelector(".ta-lang-button");
    if (botao) {
      botao.textContent = OPCOES.find((opcao) => opcao.valor === idioma).sigla;
      botao.setAttribute("aria-label", idioma === "en" ? "Language: English (change)" : "Idioma: Português (alterar)");
    }
    document.querySelectorAll(".ta-lang-option").forEach((item) => {
      item.setAttribute("aria-checked", String(item.dataset.valor === idioma));
    });
  }

  const originaisTitulo = document.title;

  function definir(valor) {
    if (!OPCOES.some((opcao) => opcao.valor === valor)) return;
    idioma = valor;
    try { localStorage.setItem(CHAVE, valor); } catch (_) {}
    aplicar();
    document.dispatchEvent(new CustomEvent("ta-idioma", { detail: { idioma } }));
  }

  aplicar();

  const carregamento = fetch("i18n/atrativos-en.json")
    .then((resposta) => resposta.ok ? resposta.json() : null)
    .then((dados) => {
      atrativosEn = dados;
      if (dados) aplicar();
      document.dispatchEvent(new CustomEvent("ta-idioma", { detail: { idioma } }));
    })
    .catch(() => {});

  document.addEventListener("DOMContentLoaded", () => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "ta-lang-button";
    botao.textContent = OPCOES.find((opcao) => opcao.valor === idioma).sigla;
    botao.setAttribute("aria-haspopup", "true");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", "ta-lang-menu");

    const menu = document.createElement("div");
    menu.className = "ta-lang-menu";
    menu.id = "ta-lang-menu";
    menu.hidden = true;
    menu.setAttribute("role", "radiogroup");
    menu.setAttribute("aria-label", "Idioma / Language");

    const titulo = document.createElement("div");
    titulo.className = "ta-lang-titulo";
    titulo.textContent = "IDIOMA / LANGUAGE";
    menu.appendChild(titulo);

    OPCOES.forEach((opcao) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "ta-lang-option";
      item.dataset.valor = opcao.valor;
      item.setAttribute("role", "radio");
      item.innerHTML = '<span class="ta-lang-marcador" aria-hidden="true"></span><span></span>';
      item.firstElementChild.textContent = opcao.sigla;
      item.lastElementChild.textContent = opcao.rotulo;
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

  if (typeof MutationObserver !== "undefined") {
    const observador = new MutationObserver((mutacoes) => {
      mutacoes.forEach((mutacao) => {
        if (mutacao.type === "childList") mutacao.addedNodes.forEach((no) => {
          if (no.nodeType === 1) percorrer(no);
          else if (no.nodeType === 3 && no.parentElement) aplicarTexto(no);
        });
        if (mutacao.type === "characterData") aplicarTexto(mutacao.target);
      });
    });
    const iniciar = () => observador.observe(document.body, { childList: true, subtree: true, characterData: true });
    if (document.body) iniciar();
    else document.addEventListener("DOMContentLoaded", iniciar);
  }

  window.TA_IDIOMA = { definir, obter: () => idioma, traduzir: traduzirFrase, cartaoAtrativo, pronto: carregamento };
})();
