import { nfIcons } from '../utils/language_icons.tsx';
import { IconLink } from './IconLink.tsx';

export const Language = ({
  text,
  learning,
  libraries,
  stats,
  accent,
}: {
  text: string;
  learning?: boolean;
  libraries?: string[];
  stats?: { data: { name: string; text: string }[] };
  accent?: string;
}) => {
  return (
    <div className={'language'}>
      <p>
        <span className={'icon'}>{nfIcons[text.toLowerCase()]}</span> {text}
        {learning && <span className={'learning'}>Learning</span>}
        {stats && (
          <span className={'time'}>
            ({stats.data.find((lang) => lang.name === text)?.text})
          </span>
        )}
      </p>
      <div style={{ display: 'flex' }}>
        {libraries &&
          libraries.map((library) => {
            return (
              <IconLink
                icon={nfIcons[library.toLowerCase()]}
                title={library}
                accent={accent}
              />
            );
          })}
      </div>
    </div>
  );
};
