// ============ Preloader: logo visible 2s como mínimo ============
const PRELOADER_MIN = 2000;
const preloaderStart = performance.now();
const hidePreloader = () => document.getElementById("preloader").classList.add("is-done");

window.addEventListener("load", () => {
  const restante = Math.max(0, PRELOADER_MIN - (performance.now() - preloaderStart));
  setTimeout(hidePreloader, restante);
});
setTimeout(hidePreloader, 4200); // failsafe si algún recurso se atasca

// ============ Barra de progreso ============
const progress = document.getElementById("progress");

// ============ Nav: fondo al hacer scroll + ocultar al bajar ============
const nav = document.getElementById("nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(y / max) * 100}%`;

  nav.classList.toggle("is-scrolled", y > 60);
  if (!nav.classList.contains("menu-open")) {
    nav.classList.toggle("is-hidden", y > lastScroll && y > 320);
  }
  lastScroll = y;

  // Parallax del hero
  const active = document.querySelector(".hero__img.is-active");
  if (active && y < window.innerHeight) {
    active.style.translate = `0 ${y * 0.22}px`;
  }
}, { passive: true });

// ============ Pase de fotos del hero ============
const heroImgs = [...document.querySelectorAll(".hero__img")];
const heroDots = [...document.querySelectorAll(".hero__dots button")];
let heroIndex = 0;
let heroTimer;

const showSlide = (i) => {
  heroIndex = i % heroImgs.length;
  heroImgs.forEach((img, k) => img.classList.toggle("is-active", k === heroIndex));
  heroDots.forEach((dot, k) => dot.classList.toggle("is-active", k === heroIndex));
};

const startHero = () => {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showSlide(heroIndex + 1), 5200);
};

heroDots.forEach((dot, i) => dot.addEventListener("click", () => { showSlide(i); startHero(); }));
startHero();

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

// ============ Reveal on scroll (escalonado por sección) ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll("section, .marquee, footer").forEach((section) => {
  section.querySelectorAll(".reveal, .img-reveal").forEach((el, i) => {
    el.style.setProperty("--d", `${Math.min(i * 0.07, 0.45)}s`);
    revealObserver.observe(el);
  });
});

// ============ Contadores animados ============
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1500;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
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

// ============ Lightbox de galería ============
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.lightbox;
    lightboxImg.alt = item.querySelector("img").alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
};
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

// ============ Cursor personalizado ============
const cursor = document.getElementById("cursor");
if (window.matchMedia("(pointer: fine)").matches) {
  let cx = 0, cy = 0, tx = 0, ty = 0;

  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });

  const follow = () => {
    cx += (tx - cx) * 0.16;
    cy += (ty - cy) * 0.16;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();

  document.querySelectorAll("a, button, [data-lightbox], [data-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  });
}
