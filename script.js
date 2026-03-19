/* ========================================
   BCHGSV — Portfolio Script
   ======================================== */

/* ---- i18n ---- */
const i18n = {
  ru: {
    'nav.about': 'Обо мне',
    'nav.work': 'Работы',
    'nav.approach': 'Подход',
    'nav.contact': 'Контакт',
    'nav.menu': 'Меню',
    'hero.subtitle': 'Режиссёр, оператор и монтажёр. Превращаю сырой материал в структурированные, цепляющие истории с чётким ритмом и эмоциональной динамикой.',
    'hero.cta': 'Начать проект',
    'hero.heading': 'Создаю истории для YouTube, документалок и\u00a0кино',
    'hero.showreel': 'Смотреть шоурил',
    'about.label': 'ОБО МНЕ',
    'about.display': 'Я беру на себя структуру истории, нарративный поток и финальный монтаж — чтобы авторы могли сосредоточиться на контенте и росте.',
    'about.body': 'Монтажёр-режиссёр. Специализируюсь на длинных YouTube-форматах и документальном сторителлинге. Помогаю авторам превращать сырой материал в структурированные, удерживающие внимание истории с чётким ритмом.',
    'about.step1': 'Сырой материал',
    'about.step2': 'Структура и ритм',
    'about.step3': 'Финальный монтаж',
    'work.label': 'ИЗБРАННЫЕ РАБОТЫ<sup>(14)</sup>',
    'work.showreel': 'Смотреть шоурил',
    'work.watch': 'Смотреть',
    'work.meta.biomachine': 'Режиссёр | Монтажёр | 1.8М просмотров',
    'work.meta.yantoples': 'Оператор | Монтажёр | Колорист',
    'work.meta.frametamer': 'Оператор | Режиссёр | 500К просмотров',
    'work.meta.frametamerdoc': 'Документалистика | Режиссёр | Монтажёр',
    'approach.label': 'ПОЧЕМУ Я',
    'approach.heading': 'Что я привношу в каждый проект',
    'approach.cta': 'Связаться',
    'approach.r1.title': 'Владение нарративом',
    'approach.r1.text': 'Беру полную ответственность за структуру истории, ритм и эмоциональный тон — чтобы вы могли сосредоточиться на создании контента и росте аудитории.',
    'approach.r2.title': 'Монтаж на удержание',
    'approach.r2.text': 'Каждый кат работает и на историю, и на алгоритм. Выстраиваю контент на максимальное удержание без потери нарративного качества и эмоционального воздействия.',
    'approach.r3.title': 'Документальный и кинематографический взгляд',
    'approach.r3.text': 'Обучался сценарному мастерству и драматургии в NYFA. Привношу кинематографическое мышление в YouTube, клипы и коммерческие проекты.',
    'approach.r4.title': 'Доказанные результаты',
    'approach.r4.text': 'Видео с 200К, 500К, 1.8М и 2.4М просмотров. Знаю, что работает для длинного YouTube, вирусных шортсов и документального сторителлинга.',
    'skills.label': 'НАВЫКИ И ИНСТРУМЕНТЫ',
    'skills.text1': 'Монтаж видео/фильмов и\u00a0нарративный сторителлинг. YouTube long-form и\u00a0short-form монтаж на удержание. Документальный и\u00a0кинематографический монтаж.',
    'skills.text2': 'Работа с авторами, блогерами и продакшн-командами. Структурирование сложных историй из сырого материала. Музыкальный ритм и эмоциональный тайминг.',
    'footer.headline': 'Есть история, которую нужно снять? <a href="mailto:bchgsv@gmail.com" class="footer-cta-inline">Напишите мне &#8594;</a>',
    'footer.city': 'Москва',
    'footer.copy': '&copy;2026 Руслан Бучугасов',
    'footer.credit': 'NYFA Сценарное мастерство и\u00a0драматургия \'24'
  }
};

function applyLang() {
  const lang = navigator.language || navigator.userLanguage || 'en';
  const isRu = /^(ru|kk)/i.test(lang);
  if (!isRu) return;

  document.documentElement.lang = 'ru';
  const strings = i18n.ru;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!strings[key]) return;
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = strings[key];
    } else {
      el.textContent = strings[key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ---- i18n (must run before split-words) ----
  applyLang();

  // ---- PAGE ENTRANCE ----
  document.body.classList.add('is-loading');

  // ---- LENIS SMOOTH SCROLL ----
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 2
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  document.documentElement.style.scrollBehavior = 'auto';

  const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

  // ---- MAGNETIC HOVER EFFECT ----
  if (isDesktop) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => { el.style.transition = ''; }, 400);
      });

      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
      });
    });
  }

  // ---- 3D TILT ON PROJECT CARDS ----
  if (isDesktop) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      const wrapper = card.querySelector('.project-image-wrapper');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = y * -8;
        const rotateY = x * 8;

        if (wrapper) {
          wrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (wrapper) {
          wrapper.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        }
      });
    });
  }

  // ---- SPLIT TEXT INTO WORDS ----
  document.querySelectorAll('[data-split-words]').forEach(el => {
    const text = el.textContent;
    const words = text.split(/\s+/);
    el.innerHTML = words.map(word =>
      `<span class="split-word"><span class="split-word-inner">${word}</span></span>`
    ).join('');
  });

  // ---- MOSCOW TIME ----
  const moscowTimeEl = document.getElementById('moscowTime');
  function updateMoscowTime() {
    if (!moscowTimeEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Moscow',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    moscowTimeEl.textContent = timeStr;
  }
  updateMoscowTime();
  setInterval(updateMoscowTime, 1000);

  // ---- MOBILE MENU ----
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    mobileToggle.style.opacity = '0';
    mobileToggle.style.pointerEvents = 'none';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    mobileToggle.style.opacity = '1';
    mobileToggle.style.pointerEvents = 'auto';
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', openMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ---- NAV PILL HOVER ----
  const navLinks = document.querySelector('.nav-links');
  const navPill = document.querySelector('.nav-pill');
  const navLinkEls = document.querySelectorAll('.nav-link');
  if (navLinks && navPill) {
    navLinkEls.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const lr = link.getBoundingClientRect();
        const cr = navLinks.getBoundingClientRect();
        navPill.style.left = `${lr.left - cr.left}px`;
        navPill.style.width = `${lr.width}px`;
      });
    });
    navLinks.addEventListener('mouseleave', () => { navPill.style.opacity = '0'; });
    navLinks.addEventListener('mouseenter', () => { navPill.style.opacity = '1'; });
  }

  // ---- NAV SCROLL HIDE/SHOW ----
  const navbar = document.querySelector('.navbar');
  let lastScrollY = 0;
  let scrollThreshold = 100;
  let ticking = false;

  function handleNavScroll() {
    const currentY = window.scrollY;
    if (currentY > scrollThreshold) {
      if (currentY > lastScrollY && currentY - lastScrollY > 5) {
        // Scrolling down
        navbar.classList.add('nav-hidden');
      } else if (lastScrollY > currentY && lastScrollY - currentY > 5) {
        // Scrolling up
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });


  // ---- GSAP SCROLL ANIMATIONS ----
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    if (!ScrollTrigger.isRegistered) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // --- PAGE ENTRANCE ANIMATION ---
    const entranceTl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('is-loading');
      }
    });

    // Fade in navbar
    entranceTl.fromTo('.navbar',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.2
    );

    // Hero subtitle — clip-path reveal (text slides up into view)
    entranceTl.to('.hero-subtitle', {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1,
      ease: 'power3.inOut'
    }, 0.5);

    entranceTl.fromTo('.cta-link',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.0
    );

    // Split words reveal for hero heading
    const heroWords = document.querySelectorAll('.heading-hero .split-word-inner');
    if (heroWords.length > 0) {
      gsap.set(heroWords, { y: '110%' });
      entranceTl.to(heroWords, {
        y: '0%',
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, 0.3);
    }

    // Showreel section
    entranceTl.fromTo('.hero-project-image',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.7
    );

    // --- TEXT DISPLAY REVEAL ---
    gsap.utils.toArray('.text-display').forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // Hero heading parallax
    const heroHeading = document.querySelector('.heading-hero');
    if (heroHeading) {
      gsap.to(heroHeading, {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Hero left text parallax
    const heroLeft = document.querySelector('.hero-left');
    if (heroLeft) {
      gsap.to(heroLeft, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Footer headline
    gsap.utils.toArray('.footer-headline').forEach(el => {
      gsap.fromTo(el,
        { y: 40, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // Section dividers
    gsap.utils.toArray('.section-divider').forEach(el => {
      gsap.fromTo(el,
        { y: 20, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // Choose rows — dim-to-bright on scroll
    gsap.utils.toArray('.choose-row').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0.35, immediateRender: false },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true
          }
        }
      );
    });

    // Project cards — staggered reveal with scale
    gsap.utils.toArray('.project-card').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0, scale: 0.95, immediateRender: false },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // Skill tags stagger
    gsap.utils.toArray('.skill-tag').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 15, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 0.4,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });

    // Footer logomark
    const footerLogomark = document.querySelector('.footer-logomark-img');
    if (footerLogomark) {
      gsap.fromTo(footerLogomark,
        { scale: 0.6, opacity: 0, immediateRender: false },
        {
          scale: 1, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.footer-content-wrap',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1
          }
        }
      );
    }

    // Footer wordmark
    gsap.fromTo('.footer-giant-wordmark',
      { y: 30, opacity: 0, immediateRender: false },
      {
        y: 0, opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-giant-wordmark', start: 'top 95%', once: true }
      }
    );

    // Body secondary text
    gsap.utils.toArray('.text-body-secondary').forEach(el => {
      gsap.fromTo(el,
        { y: 30, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    // Choose heading
    const chooseHeading = document.querySelector('.choose-heading-xl');
    if (chooseHeading) {
      gsap.fromTo(chooseHeading,
        { y: 40, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: chooseHeading, start: 'top 85%', once: true }
        }
      );
    }

    // Branding matters text
    gsap.utils.toArray('.branding-matters-text').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 25, opacity: 0, immediateRender: false },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

  }

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
