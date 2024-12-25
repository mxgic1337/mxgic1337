import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const IconLink = ({icon, title, url}: { icon: IconDefinition, title: string, url?: string }) => {
	return <a className={`icon-link${url ? " clickable" : ""}`} title={title} href={url} target={'_blank'}>
		<FontAwesomeIcon icon={icon}/>
	</a>
}