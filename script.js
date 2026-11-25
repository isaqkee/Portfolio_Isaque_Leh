// ===== EDITE AQUI OS SEUS CONTATOS =====
// WhatsApp: 55 + DDD + número, só dígitos. Ex.: "55" + "11" + "9XXXXXXXX"
// Instagram: só o nome de usuário, sem @
const CONTATOS = {
  isaque:  { whatsapp: "5511978273114", instagram: "isaquecorreiaa" },
  leticia: { whatsapp: "5511977837547", instagram: "leticiafariasss_" },
  email: ""
};
// =======================================

// Preenche os links. O que estiver vazio aparece como "em breve".
function preencher(seletor, valor, url, texto) {
  document.querySelectorAll(seletor).forEach((link) => {
    const legenda = link.querySelector("span");
    if (valor) {
      link.href = url;
      if (legenda) legenda.textContent = texto;
    } else if (legenda) {
      legenda.textContent = "Em breve";
    }
  });
}

["isaque", "leticia"].forEach((pessoa) => {
  const { whatsapp, instagram } = CONTATOS[pessoa];
  preencher(`[data-zap="${pessoa}"]`, whatsapp, `https://wa.me/${whatsapp}`, `+${whatsapp}`);
  preencher(`[data-insta="${pessoa}"]`, instagram, `https://instagram.com/${instagram}`, `@${instagram}`);
});
preencher("[data-email]", CONTATOS.email, `mailto:${CONTATOS.email}`, CONTATOS.email);

// Menu do celular
const botaoMenu = document.querySelector(".menu-botao");
const menu = document.getElementById("menu");
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  }
});

// Filtro de projetos
const filtros = document.querySelectorAll(".filtro");
filtros.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtros.forEach((b) => {
      b.classList.toggle("ativo", b === botao);
      b.setAttribute("aria-pressed", b === botao);
    });
    const escolha = botao.dataset.filtro;
    document.querySelectorAll(".projeto").forEach((p) => {
      p.classList.toggle("escondido", escolha !== "todos" && p.dataset.categoria !== escolha);
    });
  });
});

// Formulário: abre o WhatsApp com a mensagem pronta
document.getElementById("formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = new FormData(e.target);
  const numero = CONTATOS[dados.get("destino")].whatsapp;
  if (!numero) {
    alert("O número de WhatsApp ainda não foi cadastrado.");
    return;
  }
  const texto = `Olá! Meu nome é ${dados.get("nome")}. ${dados.get("mensagem")}`;
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
});

// Animação ao rolar a página
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  const observador = new IntersectionObserver((itens) => {
    itens.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("visivel");
        observador.unobserve(item.target);
      }
    });
  });
  document.querySelectorAll(".revelar").forEach((s) => observador.observe(s));
}

document.getElementById("ano").textContent = new Date().getFullYear();
