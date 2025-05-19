const ICONS = [
  { id: "typescript", name: "TypeScript", icon: "" },
  { id: "javascript", name: "JavaScript", icon: "" },
  { id: "java", name: "Java", icon: "" },
  { id: "react", name: "React", icon: "" },
  { id: "vite", name: "Vite", icon: "" },
  { id: "less", name: "Less", icon: "" },
  { id: "css", name: "CSS", icon: "" },
  { id: "rust", name: "Rust", icon: "" },
  { id: "website", name: "Website", icon: "" },
]

function getIcon(id) {
  return ICONS.find(icon => icon.id === id);
}

function addIconCharacter(id) {
  const parentNode = document.currentScript.parentNode;
  let icon = getIcon(id)
  if (!icon) {
    icon = { name: id, icon: "" }
  }
  parentNode.textContent = icon.icon;
  if (!parentNode.title) {
    parentNode.title = icon.name;
  }
}
