import FeatherIcon from 'feather-icons-react';

export const SectionTitle = ({
  text,
  icon,
}: {
  text: string;
  icon?: string;
}) => {
  return (
    <div className={'section-title'}>
      <p>
        {icon && <FeatherIcon icon={icon} />} {text}
      </p>
      <hr />
    </div>
  );
};
