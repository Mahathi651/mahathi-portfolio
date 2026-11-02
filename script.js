
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  const menuButton = document.getElementById("menuButton");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Mobile navigation
  menuButton.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.innerHTML = open
      ? '<svg class="icon"><use href="#i-close"></use></svg>'
      : '<svg class="icon"><use href="#i-menu"></use></svg>';
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.innerHTML = '<svg class="icon"><use href="#i-menu"></use></svg>';
    });
  });

  // Header and scroll progress
  function updateScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", scrollY > 30);
    progress.style.width = `${maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0}%`;
  }

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  // Reveal animation
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // Hero rotating phrase
  const rotatingWord = document.getElementById("rotatingWord");
  const phrases = [
    "clean code.",
    "useful products.",
    "thoughtful solutions.",
    "better experiences."
  ];
  let phraseIndex = 0;

  if (rotatingWord) {
    setInterval(() => {
      rotatingWord.classList.add("changing");
      setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        rotatingWord.textContent = phrases[phraseIndex];
        rotatingWord.classList.remove("changing");
      }, 220);
    }, 2500);
  }

  // Subtle pointer response for project cards
  const workCards = document.querySelectorAll(".work-card");

  workCards.forEach(card => {
    card.addEventListener("pointermove", event => {
      if (window.innerWidth < 900) return;

      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      card.style.setProperty("--pointer-x", `${x * 100}%`);
      card.style.setProperty("--pointer-y", `${y * 100}%`);
    });
  });
});
