import { Sponsor } from '../App';
import { SectionTitle } from './SectionTitle';

export const Sponsors = ({ sponsors }: { sponsors: Sponsor[] }) => {
  return (
    <section>
      <SectionTitle text={'GitHub Sponsors:'} icon={'heart'} />
      <p className={'comment'}>{'// Thank you for supporting me :D'}</p>
      <div className={'sponsors'}>
        {sponsors.map((sponsor) => {
          return (
            <img
              src={sponsor.avatar}
              className={'sponsor'}
              title={`${sponsor.username} • ${sponsor.tier}`}
              onClick={() => {
                window.open(`https://github.com/${sponsor.username}`, '_blank');
              }}
            />
          );
        })}
      </div>
    </section>
  );
};
