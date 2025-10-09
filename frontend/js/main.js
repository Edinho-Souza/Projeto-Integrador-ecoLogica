document.addEventListener("DOMContentLoaded", function () {

  // 1. Ferramenta para buscar os pedaços da página
  const carregarHTML = (elementId, filePath) => {
    return fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`[ERRO 404] Arquivo não encontrado: ${filePath}`);
        return response.text();
      })
      .then(html => {
        const elemento = document.getElementById(elementId);
        if (elemento) elemento.innerHTML = html;
      })
      .catch(error => console.error(error));
  };

  // 2. Função que "ativa" TODOS os componentes depois que a página está montada
  const inicializarComponentes = () => {
    console.log("Página montada! Ativando componentes...");

    // --- Ativa a Barra de Pesquisa ---
    const searchBtn = document.getElementById('searchBtn');
    const searchBox = document.getElementById('searchBox');
    if (searchBtn && searchBox) {
      searchBtn.addEventListener('click', () => {
        searchBox.style.width = (searchBox.style.width === '200px') ? '0' : '200px';
        if (searchBox.style.width === '200px') searchBox.querySelector('input').focus();
      });
    }

    // --- Ativa o Modal ---
    const authModal = document.getElementById('authModal');
    const openModalBtns = document.querySelectorAll('.btn-custom.btn-auth, .btn-custom.btn-auth-offcanvas');
    const closeModalBtn = document.querySelector('.close-modal');
    if (authModal && openModalBtns.length > 0 && closeModalBtn) {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const forms = document.querySelectorAll('.modal-form');
      openModalBtns.forEach(btn => btn.addEventListener('click', () => { authModal.style.display = 'flex'; }));
      closeModalBtn.addEventListener('click', () => { authModal.style.display = 'none'; });
      window.addEventListener('click', (e) => { if (e.target === authModal) authModal.style.display = 'none'; });
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          forms.forEach(f => f.classList.remove('active'));
          document.getElementById(btn.dataset.tab + 'Form').classList.add('active');
        });
      });
    }

    // --- Ativa o Botão "Voltar ao Topo" ---
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
      window.onscroll = () => {
        const shouldBeVisible = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
        backToTopButton.style.display = shouldBeVisible ? "block" : "none";
      };
      backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

 // --- Ativa o Menu Offcanvas do Bootstrap (Mobile) ---
    const offcanvasElement = document.getElementById('offcanvasMenu');
    if (offcanvasElement) {
        // Esta linha "apresenta" o menu que acabamos de carregar
        // ao JavaScript do Bootstrap, ativando suas funcionalidades.
        new bootstrap.Offcanvas(offcanvasElement);
    }
};

  // 3. Ordem de montagem
  const todasAsPartes = [
    carregarHTML("placeholder-header", "partials/header.html"),
    carregarHTML("placeholder-banner", "partials/banner.html"),
    carregarHTML("placeholder-campanhas", "partials/campanhasAtivas.html"),
    carregarHTML("placeholder-ranking", "partials/ranking.html"),
    carregarHTML("placeholder-newsletter", "partials/newsletter.html"),
    carregarHTML("placeholder-rodape", "partials/rodape.html"),
    carregarHTML("placeholder-imagem-rodape", "partials/imagemRodape.html"),
    carregarHTML("placeholder-modal", "partials/modal.html"),
    carregarHTML("placeholder-botao-topo", "partials/botaoVoltarTopo.html"),
    carregarHTML("placeholder-menu", "partials/menuOffcanvas.html")
  ];

  // Espera TODAS as partes serem carregadas
  Promise.all(todasAsPartes).then(() => {
    // Quando a "casa" estiver construída, chamamos a "equipe de montagem"
    inicializarComponentes();
  });
});

// --- Ativa o Carrossel de Parceiros ---
    const partnersCarouselElement = document.getElementById('partnersCarousel');
    if (partnersCarouselElement) {
        // Esta linha "apresenta" o carrossel ao JavaScript do Bootstrap,
        // ativando as setas e a animação de deslize.
        new bootstrap.Carousel(partnersCarouselElement, {
            interval: false, // Impede o carrossel de girar sozinho
            wrap: true       // Permite que o carrossel volte ao início depois do último item
        });
    }
