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

function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('theme-switcher');
  const defaultTheme = localStorage.getItem('flavor') || 'mocha';
  switcher.addEventListener('change', (e) => {
    setTheme(e.currentTarget.value)
  });
  switcher.value = defaultTheme;
  setTheme(defaultTheme);

  /* WakaTime total time */
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

  /* GitHub Sponsors */
  fetch('/api/sponsors').then(async (response) => {
    if (response.ok) {
      const sponsors = await response.json();
      const sponsorsDiv = document.getElementsByClassName('sponsors')[0];
      sponsorsDiv.innerHTML = '';
      for (const sponsor of sponsors) {
        const sponsorAvatar = document.createElement('img');
        sponsorAvatar.classList.add('sponsor');
        sponsorAvatar.src = sponsor.avatar;
        sponsorAvatar.title = `${sponsor.name ? `${sponsor.name} (${sponsor.username})` : sponsor.username} • ${sponsor.tier.name}`
        sponsorAvatar.onclick = () => {
          window.open(`https://github.com/${sponsor.username}`, '_blank')
        }
        sponsorsDiv.appendChild(sponsorAvatar);
      }
      const sponsorAdd = document.createElement('div');
      sponsorAdd.innerText = '♥';
      sponsorAdd.classList.add('sponsor');
      sponsorAdd.classList.add('add');
      sponsorAdd.title = `Support me on GitHub Sponsors`
      sponsorAdd.onclick = () => {
        window.open(`https://github.com/sponsors/mxgic1337`, '_blank')
      }
      sponsorsDiv.appendChild(sponsorAdd);
    }
  })
})
