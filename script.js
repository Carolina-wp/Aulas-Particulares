/* ===============================
   REVEAL ON SCROLL (Intersection)
================================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ===============================
   SPLIT TEXT (LETRA POR LETRA)
================================ */
document.querySelectorAll('.split-text').forEach(text => {
  const letters = text.innerText.split('');
  text.innerHTML = '';

  letters.forEach((letter, i) => {
    const span = document.createElement('span');
    span.textContent = letter === ' ' ? '\u00A0' : letter;
    span.style.animationDelay = `${i * 0.05}s`;
    text.appendChild(span);
  });
});


/* ===============================
   CURSOR CUSTOMIZADO (DESKTOP)
================================ */
const isTouchDevice =
  'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Efeito hover em links e botões
  document.querySelectorAll('a, button, .btn').forEach(el => {
    el.addEventListener('mouseenter', () =>
      cursor.classList.add('cursor-hover')
    );
    el.addEventListener('mouseleave', () =>
      cursor.classList.remove('cursor-hover')
    );
  });
}

/* ===============================
   SCROLL PROGRESS
================================ */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  document.querySelector('.scroll-progress').style.width = `${progress}%`;
});

/* ===============================
   CARDS MAGNÉTICOS
================================ */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `
      perspective(1200px)
      rotateX(${(-y / 20)}deg)
      rotateY(${(x / 20)}deg)
      translateY(-18px)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===============================
   CONTADOR ANIMADO
================================ */
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = +el.dataset.count;
    let count = 0;

    const update = () => {
      count += target / 60;
      if (count < target) {
        el.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };

    update();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));
