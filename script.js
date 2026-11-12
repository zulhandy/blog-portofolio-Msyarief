
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// CURRENT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// SCROLL ANIMATION

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }

  });

}, {
  threshold: 0.12
});

document.querySelectorAll(
  ".section, .project-card, .skill-card, .blog-item, .contact-box"
).forEach(element => {

  element.classList.add("reveal");
  observer.observe(element);

});


// ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      navLinks.forEach(link => {
        link.classList.remove("active");

        if (
          link.getAttribute("href") ===
          "#" + entry.target.id
        ) {
          link.classList.add("active");
        }

      });

    }

  });

}, {
  rootMargin: "-30% 0px -60% 0px"
});

sections.forEach(section => {
  sectionObserver.observe(section);
});


// BLOG MODAL

const modal = document.getElementById("blogModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalCategory = document.getElementById("modalCategory");
const modalBody = document.getElementById("modalBody");

const blogItems = document.querySelectorAll(".blog-item");

function openArticle(article) {

  modalTitle.textContent = article.dataset.title;
  modalDate.textContent = article.dataset.date;
  modalCategory.textContent = article.dataset.category;
  modalBody.textContent = article.dataset.content;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeArticle() {

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

blogItems.forEach(article => {

  article.addEventListener("click", () => {
    openArticle(article);
  });

});

modalClose.addEventListener("click", closeArticle);

modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeArticle();
  }

});

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeArticle();
  }

});
