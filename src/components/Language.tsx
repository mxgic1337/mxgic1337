import { IconLink } from './IconLink.tsx';
import { IconType } from '@icons-pack/react-simple-icons';
import { ReactElement } from 'react';

export const Language = ({
  icon,
  text,
  libraries,
}: {
  icon: ReactElement<IconType>;
  text: string;
  libraries?: { icon: ReactElement<IconType>; text: string }[];
}) => {
  return (
    <div className={'language'}>
      <p>
        {icon} {text}
      </p>
      <div style={{ display: 'flex' }}>
        {libraries &&
          libraries.map((library) => {
            return <IconLink icon={library.icon} title={library.text} />;
          })}
      </div>
    </div>
  );
};
