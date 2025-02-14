import { IconLink } from './IconLink.tsx';

export const Language = ({
  icon,
  text,
  learning,
  libraries,
  accent,
}: {
  icon?: string;
  text: string;
  learning?: boolean;
  libraries?: string[];
  accent?: string;
}) => {
  return (
    <div className={'language'}>
      <p>
        <img
          src={`https://cdn.simpleicons.org/${icon || text.toLowerCase()}/${accent || 'currentColor'}`}
        />{' '}
        {text}
        {learning && <span className={'learning'}>Learning</span>}
      </p>
      <div style={{ display: 'flex' }}>
        {libraries &&
          libraries.map((library) => {
            return (
              <IconLink
                iconName={library.toLowerCase()}
                title={library}
                accent={accent}
              />
            );
          })}
      </div>
    </div>
  );
};
