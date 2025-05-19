const ICONS = [
  { id: "typescript", name: "TypeScript", icon: "" },
  { id: "javascript", name: "JavaScript", icon: "" },
  { id: "java", name: "Java", icon: "" },
  { id: "react", name: "React", icon: "" },
  { id: "vite", name: "Vite", icon: "" },
  { id: "less", name: "Less", icon: "" },
  { id: "sass", name: "Sass", icon: "" },
  { id: "css", name: "CSS", icon: "" },
  { id: "html", name: "HTML", icon: "" },
  { id: "rust", name: "Rust", icon: "" },
  { id: "website", name: "Website", icon: "" },
]

function getIcon(id) {
  return ICONS.find(icon => icon.id === id);
}

function addIconCharacter(id) {
  const parentNode = document.currentScript.parentNode;
  document.currentScript.remove()
  let icon = getIcon(id)
  if (!icon) {
    icon = { name: id, icon: "" }
  }
  parentNode.textContent = icon.icon;
  if (!parentNode.title) {
    parentNode.title = icon.name;
  }
}

/*
 * Theme switcher
 */

let currentTheme = 'mocha';

function setTheme(theme) {
  currentTheme = theme;
  document.getElementsByTagName('html')[0].className = theme;
  localStorage.setItem('flavor', theme);
  const wakaTimeBadges = document.getElementsByClassName('wakatime-badge');
  const accentColor = window.getComputedStyle(document.body).getPropertyValue('--accent');

  for (const badge of wakaTimeBadges) {
    badge.src = badge.src.substring(0, badge.src.length - 6) + accentColor.substring(1)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('theme-switcher');
  const defaultTheme = localStorage.getItem('flavor') || 'mocha';
  switcher.addEventListener('change', (e) => {
    setTheme(e.currentTarget.value)
  });
  switcher.value = defaultTheme;
  setTheme(defaultTheme);

  fetch(
    'https://wakatime.com/share/@mxgic1337/91258e31-1dd0-41f7-9f9c-c1c5cbc30f46.json'
  ).then(async (response) => {
    if (response.ok) {
      const stats = (await response.json()).data;
      const languagesDiv = document.getElementsByClassName('languages')[0];
      for (const languageDiv of languagesDiv.getElementsByClassName('language')) {
        const languageStats = stats.find(language => language.name.toLowerCase() === languageDiv.getAttribute('data-language'));
        if (!languageStats) continue;
        languageDiv.getElementsByClassName('time')[0].textContent = `(${languageStats.text})`
      }
    }
  });
})
