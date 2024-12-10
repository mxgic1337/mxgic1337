import {faGlobeAmericas, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faYoutube, faTwitch, faDiscord} from "@fortawesome/free-brands-svg-icons";
import {IconLink} from "./IconLink.tsx";

export const Project = ({text, urls}:{text: string, urls: {text: string, url: string}[]}) => {
    function getIcon(url: string): IconDefinition {
        if (url.startsWith("https://github.com")) { return faGithub }
        else if (url.startsWith("https://youtube.com") || url.startsWith("https://youtube.com")) { return faYoutube }
        else if (url.startsWith("https://discord.com") || url.startsWith("https://discord.gg")) { return faDiscord }
        else if (url.startsWith("https://twitch.tv")) { return faTwitch }
        else return faGlobeAmericas;
    }

    return <div className={'project'}>
        <p>{text}</p>
        <div style={{display: 'flex'}}>
            {urls.map(url => {
                return <IconLink icon={getIcon(url.url)} title={url.text} url={url.url} />
            })}
        </div>
    </div>
}