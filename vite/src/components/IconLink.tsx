import { ReactElement } from 'react';

export const IconLink = ({
  icon,
  title,
  url,
}: {
  icon?: ReactElement<HTMLSpanElement> | string;
  iconName?: string;
  accent?: string;
  title?: string;
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
    </a>
  );
};
