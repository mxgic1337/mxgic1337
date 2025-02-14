import { IconLink } from './IconLink.tsx';
import { languageIconsOverrides } from '../utils/language_icons.tsx';
import {
  IconType,
  SiDiscord,
  SiFirefox,
  SiGithub,
  SiTwitch,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { ReactElement } from 'react';
import FeatherIcon from 'feather-icons-react';

export const Project = ({
  author,
  accent,
  type,
  url,
  name,
  description,
  badge,
  languages,
  urls,
}: {
  author: string;
  accent?: string;
  badge?: string;
  description?: string;
  languages: string[];
  name: string;
  type: string;
  url?: string;
  urls: { text: string; url: string }[];
}) => {
  function getIcon(
    url: string,
    title?: string
  ): ReactElement<IconType | HTMLSpanElement> {
    if (url.startsWith('https://github.com')) {
      return <SiGithub title={title} />;
    } else if (
      url.startsWith('https://youtube.com') ||
      url.startsWith('https://youtube.com')
    ) {
      return <SiYoutube title={title} />;
    } else if (
      url.startsWith('https://discord.com') ||
      url.startsWith('https://discord.gg')
    ) {
      return <SiDiscord title={title} />;
    } else if (url.startsWith('https://twitch.tv')) {
      return <SiTwitch title={title} />;
    } else if (url.startsWith('https://addons.mozilla.org')) {
      return <SiFirefox title={title} />;
    } else
      return (
        <span title={title}>
          <FeatherIcon icon={'globe'} />
        </span>
      );
  }

  return (
    <div className={'project'}>
      <div>
        <p className={'title'}>
          <FeatherIcon icon={'book'} />
          <span
            onClick={() => {
              if (type === 'github') {
                window.open(`https://github.com/${author}/${name}`);
              } else {
                window.open(url);
              }
            }}
            className={'full-name'}
          >
            <span className={'author'}>{author}</span>
            <span className={'separator'}>/</span>
            <span className={'name'}>{name}</span>
          </span>
        </p>
        <p className={'description'}>{description}</p>
      </div>
      <div className={'badges'}>
        <div style={{ display: 'flex' }}>
          {languages.map((language) => {
            return (
              <IconLink
                iconName={languageIconsOverrides[language] || language}
                accent={accent}
                title={language.charAt(0).toUpperCase() + language.substring(1)}
              />
            );
          })}
          {urls.length !== 0 && (
            <>
              <hr />
              {urls.map((url) => {
                return (
                  <IconLink
                    icon={getIcon(url.url, url.text)}
                    title={url.text}
                    url={url.url}
                  />
                );
              })}
            </>
          )}
        </div>
        {badge && <img alt={'Wakatime'} src={`${badge}?style=flat-square`} />}
      </div>
    </div>
  );
};
