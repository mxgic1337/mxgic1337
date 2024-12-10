import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const IconLink = ({icon, title, url}:{icon: IconDefinition, title: string, url?: string}) => {
    return <div className={`icon-link${url ? " clickable" : ""}`} title={title} onClick={()=>{
        if (url) window.open(url, '_blank')
    }}>
        <FontAwesomeIcon icon={icon}/>
    </div>
}