import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const SectionTitle = ({icon, text}:{icon: IconDefinition, text: string}) => {
    return <div className={'section-title'}>
        <p><FontAwesomeIcon icon={icon}/> {text}</p>
        <hr />
    </div>
}