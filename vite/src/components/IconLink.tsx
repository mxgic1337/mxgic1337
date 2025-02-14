import { ReactElement } from 'react';
import { IconType } from '@icons-pack/react-simple-icons';

export const IconLink = ({
  icon,
  iconName,
  accent,
  title,
  url,
}: {
  icon?: ReactElement<HTMLSpanElement | IconType>;
  iconName?: string;
  accent?: string;
  title: string;
  url?: string;
}) => {
  return (
    <a
      className={`icon-link${url ? ' clickable' : ''}`}
      title={title}
      href={url}
      target={'_blank'}
    >
      {icon && icon}
      {iconName && (
        <img
          src={`https://cdn.simpleicons.org/${iconName}/${accent || 'currentColor'}`}
        />
      )}
    </a>
  );
};
