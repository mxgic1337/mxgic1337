import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {IconLink} from "./IconLink.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Language = ({icon, text, libraries}: {
	icon: IconDefinition,
	text: string,
	libraries?: { icon: IconDefinition, text: string }[]
}) => {
	return <div className={'language'}>
		<p><FontAwesomeIcon icon={icon}/> {text}</p>
		<div style={{display: 'flex'}}>
			{libraries && libraries.map(library => {
				return <IconLink icon={library.icon} title={library.text}/>
			})}
		</div>
	</div>
}