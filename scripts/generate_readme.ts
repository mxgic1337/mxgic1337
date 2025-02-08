import fs from "fs";
import path from "path";
import projects_json from "../public/projects.json";
import languages_json from "./languages.json";
import links_json from "./links.json";

const ICON_COLORS: { [icon: string]: string } = {
	twitch: "#cba6f7",
	youtube: "#f38ba8",
	typescript: "#89b4fa",
	vite: "#cba6f7",
	less: "#74c7ec",
	react: "#74c7ec",
	webpack: "#cdd6f4",
	rust: "#fab387",
	javascript: "#f9e2af",
	html: "#fab387",
	css: "#cba6f7",
	sass: "#f5c2e7",
	wakatime: "#cdd6f4",
	github: "#cdd6f4",
};

const TEMPLATE_PATH = path.join("./scripts/readme_template.md");
if (!fs.existsSync(TEMPLATE_PATH)) {
	console.error(`Failed to generate README: readme_template.md missing.`);
	process.exit(1);
}

let content = fs.readFileSync(TEMPLATE_PATH).toString();

function getIcon(icon: string, size: number, color?: string) {
	return `<img height="${size}" width="${size + size * 0.25}" src="https://cdn.simpleicons.org/${icon}/${(color || ICON_COLORS[icon] || "#cdd6f4").substring(1)}" />`;
}

let projects = "";
for (const project of projects_json) {
	projects += `- [\`${project.author === "mxgic1337" ? "" : `${project.author}/`}${project.name}\`](https://github.com/${project.author}/${project.name}) `;
	projects += `- ${project.description} - `;
	projects += project.languages
		.map((language) => {
			return `${getIcon(language, 14)}`;
		})
		.join(" ");
	projects += `\n`;
}

content = content.replaceAll("{{ projects }}", projects);

let languages: string[] = [];
let languagesLearning: string[] = [];
for (const language of languages_json) {
	const list = language.learning ? languagesLearning : languages;
	list.push(
		`<span title="${language.name}">${getIcon(language.icon || language.name.toLowerCase(), 32)}</span>`,
	);
	language.tools?.forEach((tool) => {
		list.push(
			`<span title="${language.name}: ${tool}">${getIcon(tool.toLowerCase(), 32)}</span>`,
		);
	});
}

content = content.replaceAll("{{ languages }}", languages.join(" "));
content = content.replaceAll(
	"{{ languages_learning }}",
	languagesLearning.join(" "),
);

let links: string[] = [];
for (const link of links_json) {
	links.push(
		`<a href="${link.url}" title="${link.name}">${getIcon(link.name.toLowerCase(), 32)}</a>`,
	);
}

content = content.replaceAll("{{ links }}", links.join(" "));

content =
	`<!-- AUTOGENERATED: Do not edit manually. Instead, edit the "scripts/readme_template.md" file. -->\n` +
	content;

fs.writeFile(path.join("./README.md"), content, (err) => {
	if (err) {
		console.error(`Failed to generate README: ${err}`);
		process.exit(1);
	}
	console.log("README generated successfully.");
});
