const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("#navbar ul li a");
const sections = document.querySelectorAll("section");
const highlight = document.getElementById("nav-highlight");

// Function to move highlight under active link with gooey stretch + glow
function moveHighlight(activeLink) {
  const linkRect = activeLink.getBoundingClientRect();
  const navRect = navbar.getBoundingClientRect();

  // Gooey stretch & blur
  highlight.style.transform = "scaleX(1.3)";
  highlight.style.filter = "blur(2px)";

  setTimeout(() => {
    highlight.style.width = `${linkRect.width}px`;
    highlight.style.left = `${linkRect.left - navRect.left}px`;
    highlight.style.transform = "scaleX(1)";
    highlight.style.filter = "blur(0)";
  }, 50);
}

// Initial highlight position
moveHighlight(document.querySelector("#navbar ul li a.active"));

// Scroll listener for navbar & active link detection
window.addEventListener("scroll", () => {
  // Change navbar background on scroll
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Detect current section
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  // Update active link & move highlight
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
      moveHighlight(link);
    }
  });
});

// Move highlight on hover
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => moveHighlight(link));
  link.addEventListener("mouseleave", () => {
    const activeLink = document.querySelector("#navbar ul li a.active");
    moveHighlight(activeLink);
  });
});

// Adjust highlight on window resize
window.addEventListener("resize", () => {
  const activeLink = document.querySelector("#navbar ul li a.active");
  moveHighlight(activeLink);
});
