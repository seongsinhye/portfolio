const yearEl = document.getElementById('year');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');
const galleryCounter = document.getElementById('galleryCounter');
const chatBtn = document.getElementById('chatBtn');
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

chatBtn?.addEventListener('click', () => {
  window.location.href = 'gpt.html';
});

const gallerySlides = [
  {
    src: 'Images/project-1.jpg',
    alt: '제주도 공공하수 처리 현대화',
    caption: '제주도 공공하수 처리 현대화 ',
  },
  {
    src: 'Images/project-2.jpg',
    alt: '갈매수질복원센터',
    caption: '갈매수질복원센터',
  },
  {
    src: 'Images/project-3.jpg',
    alt: '스마트 정수장',
    caption: '스마트 정수장',
  },
  {
    src: 'Images/project-4.jpg',
    alt: '자산관리 - 합천',
    caption: '자산관리 - 합천',
  },
];

let galleryIndex = 0;

function renderGallerySlide() {
  if (!galleryImage || !galleryCaption || !galleryCounter || gallerySlides.length === 0) {
    return;
  }

  const slide = gallerySlides[galleryIndex];
  galleryImage.src = slide.src;
  galleryImage.alt = slide.alt;
  galleryCaption.textContent = slide.caption;
  galleryCounter.textContent = `${galleryIndex + 1} / ${gallerySlides.length}`;
}

document.querySelectorAll('[data-gallery-nav]').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.galleryNav;
    if (direction === 'next') {
      galleryIndex = (galleryIndex + 1) % gallerySlides.length;
    } else {
      galleryIndex = (galleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
    }
    renderGallerySlide();
  });
});

renderGallerySlide();

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
