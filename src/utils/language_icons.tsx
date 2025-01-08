import {
	IconType,
	SiJavascript,
	SiLess,
	SiOpenjdk,
	SiReact,
	SiSass,
	SiTypescript,
	SiVite, SiWebpack
} from "@icons-pack/react-simple-icons";
import {ReactElement} from "react";

export const languageIcons: {[key: string]: ReactElement<IconType>} = {
	typescript: <SiTypescript />,
	javascript: <SiJavascript />,
	react: <SiReact />,
	sass: <SiSass />,
	less: <SiLess />,
	java: <SiOpenjdk />,
	vite: <SiVite />,
	webpack: <SiWebpack />,
}