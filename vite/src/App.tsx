import './css/app.less';

import { IconLink } from './components/IconLink.tsx';
import { SectionTitle } from './components/SectionTitle.tsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Project } from './components/Project.tsx';
import { Language } from './components/Language.tsx';
import languages_json from '../../scripts/languages.json';
import links_json from '../../scripts/links.json';
import { Sponsors } from './components/Sponsors.tsx';

type Flavor = 'latte' | 'frappe' | 'macchiato' | 'mocha';
const flavors = [
  { name: 'Catppuccin Latte', className: 'latte', accent: 'e64553' },
  { name: 'Catppuccin Frappé', className: 'frappe', accent: 'ea999c' },
  { name: 'Catppuccin Macchiato', className: 'macchiato', accent: 'ee99a0' },
  { name: 'Catppuccin Mocha', className: 'mocha', accent: 'eba0ac' },
];

export interface Sponsor {
  name: string | null;
  username: string;
  avatar: string;
  tier: { name: string } | null;
}

function App() {
  const [wakaTimeStats, setWakaTimeStats] = useState<{
    data: { name: string; text: string }[];
  }>();
  const [flavor, setFlavor] = useState<Flavor>(
    (localStorage.getItem('flavor') as Flavor) || 'mocha'
  );
  const [sponsors, setSponsors] = useState<Sponsor[]>();
  const [projects, setProjects] = useState<
    {
      author: string;
      badge?: string;
      description?: string;
      languages: string[];
      name: string;
      type: 'github' | 'website';
      urls: { text: string; url: string }[];
    }[]
  >([]);

  useEffect(() => {
    fetch('/projects.json').then(async (response) => {
      if (response.ok) {
        setProjects(await response.json());
      }
    });
    fetch('/api/sponsors').then(async (response) => {
      if (response.ok) {
        setSponsors(await response.json());
      }
    });
    fetch(
      'https://wakatime.com/share/@mxgic1337/91258e31-1dd0-41f7-9f9c-c1c5cbc30f46.json'
    ).then(async (response) => {
      if (response.ok) {
        setWakaTimeStats(await response.json());
      }
    });
  }, []);

  useLayoutEffect(() => {
    document.getElementsByTagName('html')[0].classList.add(flavor);
    localStorage.setItem('flavor', flavor);
    return () => {
      document.getElementsByTagName('html')[0].classList.remove(flavor);
    };
  }, [flavor]);

  return (
    <>
      <main>
        <div className={'profile'}>
          <img
            className={'avatar'}
            src={'https://avatars.githubusercontent.com/u/60188749'}
            alt={'Avatar'}
          />
          <div>
            <h1>mxgic1337_</h1>
            <div className={'socials'}>
              {links_json.map((link) => {
                return (
                  <IconLink
                    icon={link.icon}
                    accent={
                      flavors.find((flavor1) => flavor1.className === flavor)
                        ?.accent
                    }
                    title={link.name}
                    url={link.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <section>
          <SectionTitle text={'Languages:'} icon={''} />
          <div className={'languages'}>
            {languages_json.map((language) => {
              return (
                <Language
                  text={language.name}
                  stats={wakaTimeStats}
                  learning={language.learning}
                  libraries={language.tools}
                />
              );
            })}
          </div>
        </section>
        <section>
          <SectionTitle text={'Projects:'} icon={''} />
          <p className={'comment'}>
            {'// Stuff that I work on in my free time'}
          </p>
          <div className={'projects'}>
            {projects.map((project) => {
              return (
                <Project
                  author={project.author}
                  accent={
                    flavors.find((flavor1) => flavor1.className === flavor)
                      ?.accent
                  }
                  type={project.type}
                  name={project.name}
                  description={project.description}
                  urls={project.urls}
                  languages={project.languages}
                  badge={project.badge}
                />
              );
            })}
          </div>
        </section>
        {sponsors && sponsors.length !== 0 && <Sponsors sponsors={sponsors} />}
        <footer>
          <p style={{ fontWeight: 'bold' }}>&copy; 2024-2025 mxgic1337_</p>
          <p>
            Uses{' '}
            <a target={'_blank'} href={'https://catppuccin.com'}>
              Catppuccin
            </a>{' '}
            color scheme.
          </p>
          <div className={'theme-switcher'}>
            <select
              className={'theme'}
              value={flavor}
              onChange={(e) => {
                setFlavor(e.currentTarget.value as Flavor);
              }}
            >
              {flavors.map((flavor) => {
                return <option value={flavor.className}>{flavor.name}</option>;
              })}
            </select>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
