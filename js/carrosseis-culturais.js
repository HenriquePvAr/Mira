document.querySelectorAll('[data-carrossel-cultural]').forEach((secao) => {
  const trilho = secao.querySelector('.cultural-carrossel__trilho');
  const controles = secao.querySelector('.cultural-carrossel__controles');
  const anterior = controles.querySelector('[data-cultural-anterior]');
  const proximo = controles.querySelector('[data-cultural-proximo]');
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');

  function atualizarControles() {
    const limite = Math.max(0, trilho.scrollWidth - trilho.clientWidth);
    controles.hidden = limite <= 1;
    anterior.disabled = trilho.scrollLeft <= 1;
    proximo.disabled = trilho.scrollLeft >= limite - 1;
  }

  function mover(direcao) {
    const cartao = trilho.querySelector('article');
    if (!cartao) return;
    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 0;
    trilho.scrollBy({
      left: direcao * (cartao.getBoundingClientRect().width + espacamento),
      behavior: movimentoReduzido.matches ? 'instant' : 'smooth',
    });
  }

  anterior.addEventListener('click', () => mover(-1));
  proximo.addEventListener('click', () => mover(1));
  trilho.addEventListener('scroll', atualizarControles, { passive: true });
  trilho.addEventListener('keydown', (evento) => {
    if (evento.target !== trilho || !['ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
    evento.preventDefault();
    mover(evento.key === 'ArrowRight' ? 1 : -1);
  });
  window.addEventListener('resize', atualizarControles);
  if ('ResizeObserver' in window) new ResizeObserver(atualizarControles).observe(trilho);
  atualizarControles();
});
