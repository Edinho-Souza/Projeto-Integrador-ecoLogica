// Abrir/fechar a barra de pesquisa
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');

searchBtn.addEventListener('click', () => {
  if (searchBox.style.width === '200px') {
    searchBox.style.width = '0';
  } else {
    searchBox.style.width = '200px';
  }
});

// Modal
const authModal = document.getElementById('authModal');
const openModalBtn = document.querySelector('.btn-custom.btn-auth'); // botão específico
const closeModalBtn = document.querySelector('.close-modal');
const tabButtons = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.modal-form');

// Abrir modal
openModalBtn.addEventListener('click', () => {
  authModal.style.display = 'flex';
});

// Fechar modal
closeModalBtn.addEventListener('click', () => {
  authModal.style.display = 'none';
});

// Fechar ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
  if (e.target === authModal) authModal.style.display = 'none';
});

// Troca de abas
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.tab;
    forms.forEach(f => f.classList.remove('active'));
    document.getElementById(tab + 'Form').classList.add('active');
  });
});


