const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

// Criar estrelas
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  starsContainer.appendChild(star);
}

// Corações flutuantes
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart-float';
  heart.textContent = '💜';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '-50px';
  heart.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 4000);
}

setInterval(createHeart, 3000);

// Navegação entre slides
function showSlide(newIndex) {
  slides[index].classList.remove('active');
  dots[index].classList.remove('active');
  index = newIndex;
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

document.getElementById('next').addEventListener('click', () => {
  showSlide((index + 1) % slides.length);
});

document.getElementById('prev').addEventListener('click', () => {
  showSlide((index - 1 + slides.length) % slides.length);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    document.getElementById('next').click();
  } else if (e.key === 'ArrowLeft') {
    document.getElementById('prev').click();
  }
});

// Coração secreto interativo
let clickCount = 0;
const secretHeart = document.getElementById('secretHeart');
const clickCounter = document.getElementById('clickCounter');
const letterModal = document.getElementById('letterModal');
const closeLetter = document.getElementById('closeLetter');

secretHeart.addEventListener('click', () => {
  clickCount++;
  
  // Feedback visual
  secretHeart.style.transform = 'scale(1.3)';
  setTimeout(() => {
    secretHeart.style.transform = 'scale(1)';
  }, 200);

  // Mostrar contador após 5 cliques
  if (clickCount >= 5 && clickCount < 22) {
    clickCounter.textContent = `${clickCount}/22 ✨`;
  }

  // Abrir carta aos 22 cliques
  if (clickCount === 22) {
    clickCounter.textContent = '💜 Abrindo sua carta...';
    setTimeout(() => {
      letterModal.classList.add('show');
      // Efeito confete
      for (let i = 0; i < 30; i++) {
        setTimeout(() => createHeart(), i * 100);
      }
    }, 500);
  }
});

closeLetter.addEventListener('click', () => {
  letterModal.classList.remove('show');
});

letterModal.addEventListener('click', (e) => {
  if (e.target === letterModal) {
    letterModal.classList.remove('show');
  }
});
// ========================================
// CONTROLE DE MÚSICA
// ========================================
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    backgroundMusic.pause();
    musicToggle.classList.remove('playing');
    musicToggle.classList.add('paused');
    isPlaying = false;
  } else {
    backgroundMusic.play().catch(error => {
      console.log('Erro ao reproduzir música:', error);
    });
    musicToggle.classList.add('playing');
    musicToggle.classList.remove('paused');
    isPlaying = true;
  }
});

// Tentar reproduzir automaticamente no primeiro clique
document.addEventListener('click', function initMusic() {
  if (!isPlaying) {
    backgroundMusic.play().then(() => {
      musicToggle.classList.add('playing');
      isPlaying = true;
    }).catch(() => {
      // Se falhar, o usuário precisa clicar no botão
      musicToggle.classList.add('paused');
    });
  }
  document.removeEventListener('click', initMusic);
}, { once: true });