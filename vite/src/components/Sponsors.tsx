import { Sponsor } from '../App';
import { SectionTitle } from './SectionTitle';

export const Sponsors = ({ sponsors }: { sponsors: Sponsor[] }) => {
  return (
    <section>
      <SectionTitle text={'GitHub Sponsors:'} icon={'heart'} />
      <p className={'comment'}>{'// Thank you for supporting me :D'}</p>
      <div className={'sponsors'}>
        {sponsors.map((sponsor) => {
          if (!sponsor.tier) return;
          return (
            <img
              src={sponsor.avatar}
              className={'sponsor'}
              title={`${sponsor.name ? `${sponsor.name} (${sponsor.username})` : sponsor.username} • ${sponsor.tier.name}`}
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
