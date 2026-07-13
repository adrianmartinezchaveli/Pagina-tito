// ============ Preloader ============
window.addEventListener("load", () => {
  document.getElementById("preloader").classList.add("is-done");
});
// Failsafe: hide preloader even if some asset stalls
setTimeout(() => {
  document.getElementById("preloader").classList.add("is-done");
}, 2500);

// ============ Nav: fondo al hacer scroll + ocultar al bajar ============
const nav = document.getElementById("nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  nav.classList.toggle("is-scrolled", y > 60);
  // Ocultar al bajar, mostrar al subir (nunca con el menú móvil abierto)
  if (!nav.classList.contains("menu-open")) {
    nav.classList.toggle("is-hidden", y > lastScroll && y > 300);
  }
  lastScroll = y;

  // Parallax suave del hero
  const heroImg = document.getElementById("heroImg");
  if (heroImg && y < window.innerHeight) {
    heroImg.style.transform = `translateY(${y * 0.25}px) scale(1.02)`;
  }
}, { passive: true });

// ============ Menú móvil ============
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("is-open");
  nav.classList.toggle("menu-open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    nav.classList.remove("menu-open");
  });
});

// ============ Reveal on scroll (con escalonado por sección) ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll("section, .marquee, footer").forEach((section) => {
  section.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.setProperty("--d", `${Math.min(i * 0.08, 0.4)}s`);
    revealObserver.observe(el);
  });
});

// ============ Contadores animados ============
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));
