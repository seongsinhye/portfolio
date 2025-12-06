const yearEl = document.getElementById('year');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const statusEl = document.getElementById('contactStatus');
const form = document.getElementById('contactForm');

// populate year once DOM is ready
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// mobile nav toggle
navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('is-open');
});

// basic form handler to mimic submission
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = formData.get('name');

  statusEl.textContent = '메시지를 전송 중입니다...';

  setTimeout(() => {
    statusEl.textContent = `${name} 님, 메시지를 잘 받았습니다! 24시간 이내로 답변드릴게요.`;
    form.reset();
  }, 800);
});
