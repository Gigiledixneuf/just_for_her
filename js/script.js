const pages = document.querySelectorAll('.page');
const nextButtons = document.querySelectorAll('.next');
const prevButtons = document.querySelectorAll('.prev');
let current = 0;

// Fonction pour aller à une page spécifique
function goToPage(index) {
  if (index < 0 || index >= pages.length) return;
  pages[current].classList.remove('active');
  current = index;
  pages[current].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation suivante
nextButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (current < pages.length - 1) {
      goToPage(current + 1);
    }
  });
});

// Navigation retour
prevButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (current > 0) {
      goToPage(current - 1);
    }
  });
});

// Fonction sécurisée pour les confettis (évite l'erreur si la lib n'est pas chargée)
function safeConfetti(options) {
  if (typeof canvasConfetti !== 'undefined') {
    canvasConfetti(options);
  } else {
    console.warn("canvas-confetti non chargé, confettis ignorés");
  }
}

// Bouton bougie
const candleBtn = document.getElementById('candleBtn');
if (candleBtn) {
  candleBtn.addEventListener('click', () => {
    // Confettis avec canvas-confetti
    safeConfetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffc2d6', '#ff99bb', '#ff6f91', '#ffb3ba', '#ffd9e8']
    });
    safeConfetti({
      particleCount: 120,
      spread: 55,
      origin: { y: 0.5, x: 0.2 },
      colors: ['#ffd9e8', '#ffa5c0']
    });
    safeConfetti({
      particleCount: 120,
      spread: 55,
      origin: { y: 0.5, x: 0.8 },
      colors: ['#ffc2d6', '#ff99bb']
    });
    
    // Étoiles filantes avec emojis aléatoires (🎉, 🥳, ❤️)
    const emojis = ['🎉', '🥳', '❤️'];
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const star = document.createElement('div');
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        star.innerHTML = randomEmoji;
        star.style.position = 'fixed';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = '-20px';
        star.style.fontSize = Math.random() * 20 + 12 + 'px';
        star.style.opacity = '0.8';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '999';
        star.style.transition = 'all 2s linear';
        document.body.appendChild(star);
        setTimeout(() => {
          star.style.transform = `translateY(${window.innerHeight + 50}px)`;
          star.style.opacity = '0';
        }, 10);
        setTimeout(() => star.remove(), 2100);
      }, i * 70);
    }
  });
}