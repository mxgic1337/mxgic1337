import { IconLink } from './IconLink.tsx';
import { nfIcons } from '../utils/language_icons.tsx';
import { ReactElement } from 'react';

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
    url: string
  ): ReactElement<HTMLImageElement | HTMLSpanElement> | string {
    if (url.startsWith('https://github.com')) {
      return nfIcons['github'];
    } else if (
      url.startsWith('https://youtube.com') ||
      url.startsWith('https://youtube.com')
    ) {
      return nfIcons['youtube'];
    } else if (
      url.startsWith('https://discord.com') ||
      url.startsWith('https://discord.gg')
    ) {
      return nfIcons['discord'];
    } else if (
      url.startsWith('https://twitch.tv') ||
      url.startsWith('https://subs.twitch.tv')
    ) {
      return nfIcons['twitch'];
    } else if (url.startsWith('https://addons.mozilla.org')) {
      return nfIcons['firefox'];
    } else return nfIcons['globe'];
  }

  return (
    <div className={'project'}>
      <div>
        <p className={'title'}>
          <span className={'icon'}>{''}</span>
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
            return <IconLink icon={nfIcons[language]} />;
          })}
          {urls.length !== 0 && (
            <>
              <hr />
              {urls.map((url) => {
                return (
                  <IconLink
                    icon={getIcon(url.url)}
                    title={url.text}
                    url={url.url}
                  />
                );
              })}
            </>
          )}
        </div>
        {badge && (
          <img
            alt={'Wakatime'}
            src={`${badge}?style=flat-square&color=${accent}`}
          />
        )}
      </div>
    </div>
  );
};
