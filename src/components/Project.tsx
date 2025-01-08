import {IconLink} from "./IconLink.tsx";
import {languageIcons} from "../utils/language_icons.tsx";
import {
	IconType,
	SiDiscord,
	SiFirefox,
	SiGithub, SiGooglechrome,
	SiJetbrains,
	SiTwitch,
	SiYoutube
} from "@icons-pack/react-simple-icons";
import {ReactElement} from "react";

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
	function getIcon(url: string, title?: string): ReactElement<IconType> {
		if (url.startsWith("https://github.com")) {
			return <SiGithub title={title} />
		} else if (url.startsWith("https://youtube.com") || url.startsWith("https://youtube.com")) {
			return <SiYoutube title={title} />
		} else if (url.startsWith("https://discord.com") || url.startsWith("https://discord.gg")) {
			return <SiDiscord title={title} />
		} else if (url.startsWith("https://twitch.tv")) {
			return <SiTwitch title={title} />
		} else if (url.startsWith("https://addons.mozilla.org")) {
			return <SiFirefox title={title} />
		} else return <SiGooglechrome title={title} />;
	}

	return <div className={'project'}>
		<p className={'title'}><SiGithub />
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
					return <IconLink icon={languageIcons[language] || <SiJetbrains />} title={language}/>
				})}
				{urls.length !== 0 && <>
					<hr/>
					{urls.map(url => {
						return <IconLink icon={getIcon(url.url, url.text)} title={url.text} url={url.url}/>
					})}
				</>}
			</div>
			{badge && <img alt={'Wakatime'} src={`${badge}?style=flat-square`}/>}
		</div>
	</div>
}