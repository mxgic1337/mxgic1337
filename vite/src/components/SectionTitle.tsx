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
        {icon && <span className={'icon'}>{icon}</span>} {text}
      </p>
      <hr />
    </div>
  );
};
