const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  document.getElementById('formStatus').textContent =
    `Thanks, ${name}! This is a demo form; no email was sent.`;
  event.target.reset();
});

// Small interactive calculator demo embedded in the Projects section.
let calcExpression = '';
const display = document.getElementById('calcDisplay');
document.querySelectorAll('[data-key]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;
    if (key === 'C') {
      calcExpression = '';
      display.textContent = '0';
      return;
    }
    if (key === '=') {
      if (!calcExpression || !/^[0-9+*/.() -]+$/.test(calcExpression)) return;
      try {
        // Evaluate only the arithmetic characters accepted by the check above.
        const result = Function(`"use strict"; return (${calcExpression})`)();
        if (Number.isFinite(result)) {
          display.textContent = String(Number(result.toFixed(8)));
          calcExpression = String(result);
        }
      } catch {
        display.textContent = 'Error';
        calcExpression = '';
      }
      return;
    }
    calcExpression += key;
    display.textContent = calcExpression;
  });
});
