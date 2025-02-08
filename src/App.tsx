import './css/app.less';

import { IconLink } from './components/IconLink.tsx';
import { SectionTitle } from './components/SectionTitle.tsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Project } from './components/Project.tsx';
import { Language } from './components/Language.tsx';
import { SiGithub, SiVscodium } from '@icons-pack/react-simple-icons';
import languages_json from '../scripts/languages.json';
import links_json from '../scripts/links.json';

type Flavor = 'latte' | 'frappe' | 'macchiato' | 'mocha';
const flavors = [
  { name: 'Catppuccin Latte', className: 'latte', accent: '8839ef' },
  { name: 'Catppuccin Frappé', className: 'frappe', accent: 'ca9ee6' },
  { name: 'Catppuccin Macchiato', className: 'macchiato', accent: 'c6a0f6' },
  { name: 'Catppuccin Mocha', className: 'mocha', accent: 'cba6f7' },
];

function App() {
  const [flavor, setFlavor] = useState<Flavor>(
    (localStorage.getItem('flavor') as Flavor) || 'mocha'
  );
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
          <img className={'avatar'} src={'/avatar.png'} alt={'Avatar'} />
          <div>
            <h1>mxgic1337_</h1>
            <div className={'socials'}>
              {links_json.map((link) => {
                return (
                  <IconLink
                    iconName={link.name.toLowerCase()}
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
          <SectionTitle text={'Languages:'} icon={<SiVscodium />} />
          <div className={'languages'}>
            {languages_json.map((language) => {
              return (
                <Language
                  icon={language.icon}
                  text={language.name}
                  learning={language.learning}
                  libraries={language.tools}
                  accent={
                    flavors.find((flavor1) => flavor1.className === flavor)
                      ?.accent
                  }
                />
              );
            })}
          </div>
        </section>
        <section>
          <SectionTitle text={'Projects:'} icon={<SiGithub />} />
          <div className={'projects'}>
            {projects.map((project) => {
              return (
                <Project
                  author={project.author}
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
        <footer>
          <p style={{ fontWeight: 'bold' }}>&copy; 2024-2025 mxgic1337_</p>
          <p>
            <a
              target={'_blank'}
              href={'https://github.com/mxgic1337/mxgic1337'}
            >
              Source code
            </a>
          </p>
          <p>
            Icons by{' '}
            <a target={'_blank'} href={'https://simpleicons.org'}>
              Simple Icons
            </a>
            .
          </p>
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
