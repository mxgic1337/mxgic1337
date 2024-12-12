import {faBookBookmark, faCode, faGlobeAmericas, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faGithub, faTwitch, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {IconLink} from "./IconLink.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {languageIcons} from "../utils/language_icons.ts";

export const Project = ({author, type, url, name, description, badge, languages, urls}: {
	author: string,
	badge?: string,
	description?: string,
	languages: string[],
	name: string,
	type: string,
	url?: string,
	urls: { text: string, url: string }[],
}) => {
	function getIcon(url: string): IconDefinition {
		if (url.startsWith("https://github.com")) {
			return faGithub
		} else if (url.startsWith("https://youtube.com") || url.startsWith("https://youtube.com")) {
			return faYoutube
		} else if (url.startsWith("https://discord.com") || url.startsWith("https://discord.gg")) {
			return faDiscord
		} else if (url.startsWith("https://twitch.tv")) {
			return faTwitch
		} else return faGlobeAmericas;
	}

	return <div className={'project'}>
		<p className={'title'}><FontAwesomeIcon icon={faBookBookmark}/>
			<span onClick={() => {
				if (type === "github") {
					window.open(`https://github.com/${author}/${name}`);
				} else {
					window.open(url);
				}
			}} className={'full-name'}>
				<span className={'author'}>{author} /</span>
				<span className={'name'}> {name}</span>
			</span>
		</p>
		<p className={'description'}>{description}</p>
		<div className={'badges'}>
			<div style={{display: 'flex'}}>
				{languages.map(language => {
					return <IconLink icon={languageIcons[language] || faCode} title={language}/>
				})}
				{urls.length !== 0 && <>
					<hr/>
					{urls.map(url => {
						return <IconLink icon={getIcon(url.url)} title={url.text} url={url.url}/>
					})}
				</>}
			</div>
			{badge && <img alt={'Wakatime'} src={`${badge}?style=flat-square`}/>}
		</div>
	</div>
}