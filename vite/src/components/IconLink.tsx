import { ReactElement } from 'react';

export const IconLink = ({
  icon,
  iconName,
  accent,
  title,
  url,
}: {
  icon?: ReactElement<HTMLSpanElement>;
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
