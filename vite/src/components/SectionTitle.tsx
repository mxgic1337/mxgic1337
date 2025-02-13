import { ReactElement } from 'react';
import { IconType } from '@icons-pack/react-simple-icons';

export const SectionTitle = ({
  text,
  icon,
}: {
  text: string;
  icon?: ReactElement<IconType>;
}) => {
  return (
    <div className={'section-title'}>
      <p>
        {icon} {text}
      </p>
      <hr />
    </div>
  );
};
