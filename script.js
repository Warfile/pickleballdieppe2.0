const lazySections = document.querySelectorAll('.lazy-load');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const section = entry.target;
      const src = section.dataset.src;

      fetch(src)
        .then(res => res.text())
        .then(html => {
          section.innerHTML = html;
          section.classList.remove('lazy-load');
          obs.unobserve(section);
        })
        .catch(err => {
          section.innerHTML = "<p>Erreur lors du chargement du contenu.</p>";
          console.error("Erreur lors du fetch:", err);
        });
    }
  });
}, {
  rootMargin: "200px",
  threshold: 0.1
});

lazySections.forEach(sec => observer.observe(sec));
