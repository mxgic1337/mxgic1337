import { IconLink } from './IconLink.tsx';
import { languageIconsOverrides } from '../utils/language_icons.tsx';
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
  function getIconImgElement(icon: string, title?: string) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${icon}/${accent || 'currentColor'}`}
        title={title ? title : icon.charAt(0).toUpperCase() + icon.substring(1)}
      />
    );
  }

  function getIcon(
    url: string,
    title?: string
  ): ReactElement<HTMLImageElement | HTMLSpanElement> {
    if (url.startsWith('https://github.com')) {
      return getIconImgElement('github', title);
    } else if (
      url.startsWith('https://youtube.com') ||
      url.startsWith('https://youtube.com')
    ) {
      return getIconImgElement('youtube', title);
    } else if (
      url.startsWith('https://discord.com') ||
      url.startsWith('https://discord.gg')
    ) {
      return getIconImgElement('discord', title);
    } else if (
      url.startsWith('https://twitch.tv') ||
      url.startsWith('https://subs.twitch.tv')
    ) {
      return getIconImgElement('twitch', title);
    } else if (url.startsWith('https://addons.mozilla.org')) {
      return getIconImgElement('firefoxbrowser', title);
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
