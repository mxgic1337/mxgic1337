import {ReactElement} from "react";
import {IconType} from "@icons-pack/react-simple-icons";

export const IconLink = ({icon, title, url}: { icon: ReactElement<IconType>, title: string, url?: string }) => {
	return <a className={`icon-link${url ? " clickable" : ""}`} title={title} href={url} target={'_blank'}>
		{icon}
	</a>
}