import './css/app.less'

import {faClock, faCode, faTools} from "@fortawesome/free-solid-svg-icons";
import {
	faCss,
	faGithub,
	faJava,
	faJs,
	faLess,
	faNodeJs,
	faReact,
	faSass,
	faTwitch,
	faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {IconLink} from "./components/IconLink.tsx";
import {SectionTitle} from "./components/SectionTitle.tsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {Project} from "./components/Project.tsx";
import {Language} from "./components/Language.tsx";

type Flavor = 'latte' | 'frappe' | 'macchiato' | 'mocha'
const flavors = [
	{name: "Catppuccin Latte", className: 'latte'},
	{name: "Catppuccin Frappé", className: 'frappe'},
	{name: "Catppuccin Macchiato", className: 'macchiato'},
	{name: "Catppuccin Mocha", className: 'mocha'},
]

function App() {
	const [flavor, setFlavor] = useState<Flavor>(localStorage.getItem('flavor') as Flavor || 'mocha')
	const [projects, setProjects] = useState<{
		author: string,
		badge?: string,
		description?: string,
		languages: string[],
		name: string,
		type: 'github' | 'website',
		urls: { text: string, url: string }[]
	}[]>([])

	useEffect(() => {
		fetch('/projects.json').then(async response => {
			if (response.ok) {
				setProjects(await response.json())
			}
		})
	}, [])

	useLayoutEffect(() => {
		document.getElementsByTagName('html')[0].classList.add(flavor);
		localStorage.setItem('flavor', flavor);
		return () => {
			document.getElementsByTagName('html')[0].classList.remove(flavor);
		}
	}, [flavor]);

	return <>
		<main>
			<div className={'profile'}>
				<img src={'/avatar.png'} alt={'Avatar'}/>
				<div>
					<h1>mxgic1337_</h1>
					<div className={'socials'}>
						<IconLink icon={faTwitch} title={'Twitch'} url={'https://twitch.tv/mxgic1337_'}/>
						<IconLink icon={faYoutube} title={'YouTube'} url={'https://youtube.com/@mxgic1337_'}/>
						<IconLink icon={faGithub} title={'GitHub'} url={'https://github.com/mxgic1337'}/>
						<IconLink icon={faClock} title={'WakaTime'} url={'https://wakatime.com/@mxgic1337'}/>
					</div>
				</div>
			</div>
			<section>
				<SectionTitle icon={faCode} text={'I code in:'}/>
				<div className={'languages'}>
					<Language icon={faJs} text={'TypeScript'}
										libraries={[{icon: faNodeJs, text: 'NodeJS'}, {icon: faReact, text: 'React'}]}/>
					<Language icon={faJava} text={'Java'}/>
					<Language icon={faCss} text={'CSS'}
										libraries={[{icon: faLess, text: 'Less'}, {icon: faSass, text: 'Sass'}]}/>
				</div>
			</section>
			<section>
				<SectionTitle icon={faTools} text={'Projects / I work on:'}/>
				<div className={'projects'}>
					{projects.map((project) => {
						return <Project author={project.author} type={project.type} name={project.name}
														description={project.description} urls={project.urls} languages={project.languages} badge={project.badge}/>
					})}
				</div>
			</section>
		</main>
		<footer>
			<p style={{fontWeight: 'bold'}}>&copy; 2024 mxgic1337_</p>
			<p>Icons by <a target={'_blank'} href={"https://fontawesome.com"}>Font Awesome</a>.</p>
			<p>Uses <a target={'_blank'} href={"https://catppuccin.com"}>Catppuccin</a> color scheme.</p>
			<div className={'theme-switcher'}>
				<select className={'theme'} value={flavor} onChange={(e) => {
					setFlavor(e.currentTarget.value as Flavor)
				}}>
					{flavors.map((flavor) => {
						return <option value={flavor.className}>{flavor.name}</option>
					})}
				</select>
			</div>
		</footer>
	</>
}

export default App
