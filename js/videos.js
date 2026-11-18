document.querySelectorAll('.videos').forEach((secao) => {
  const trilho = secao.querySelector('.videos__trilho');
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  const deslocar = (direcao) => {
    const cartao = trilho.querySelector('.videos__cartao');
    const espacamento = parseFloat(getComputedStyle(trilho).gap) || 0;
    trilho.scrollBy({ left: direcao * (cartao.getBoundingClientRect().width + espacamento), behavior: movimentoReduzido.matches ? 'instant' : 'smooth' });
  };

  secao.querySelector('[data-videos-anterior]').addEventListener('click', () => deslocar(-1));
  secao.querySelector('[data-videos-proximo]').addEventListener('click', () => deslocar(1));
  trilho.addEventListener('keydown', (evento) => {
    if (evento.target !== trilho || !['ArrowLeft', 'ArrowRight'].includes(evento.key)) return;
    evento.preventDefault();
    deslocar(evento.key === 'ArrowRight' ? 1 : -1);
  });

  secao.querySelectorAll('.videos__cartao').forEach((cartao) => {
    const botao = cartao.querySelector('.videos__assistir');
    const video = cartao.querySelector('video');
    video.addEventListener('play', () => {
      document.querySelectorAll('video').forEach((outro) => {
        if (outro !== video && !outro.paused) outro.pause();
      });
    });
    botao.addEventListener('click', () => {
      if (!video.src) video.src = video.dataset.src;
      cartao.querySelector('.videos__capa').hidden = true;
      video.hidden = false;
      video.play().catch(() => {});
      video.focus();
    });
  });
});
