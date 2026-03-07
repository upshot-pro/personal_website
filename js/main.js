/* Theme toggle
   - on load: apply saved preference, or fall back to system preference
   - on click: flip theme and save to localStorage
   - on system change: follow it only if user hasn't picked manually */
(function () {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    html.setAttribute("data-theme", "light");
  }

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";

    if (next === "dark") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", next);
    }

    localStorage.setItem("theme", next);
  });

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          html.setAttribute("data-theme", "light");
        } else {
          html.removeAttribute("data-theme");
        }
      }
    });
})();

// render lucide icons
lucide.createIcons();
