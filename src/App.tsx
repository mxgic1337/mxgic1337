import './css/app.less';

import { IconLink } from './components/IconLink.tsx';
import { SectionTitle } from './components/SectionTitle.tsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Project } from './components/Project.tsx';
import { Language } from './components/Language.tsx';
import {
  SiCss3,
  SiGithub,
  SiLess,
  SiNodedotjs,
  SiOpenjdk,
  SiReact,
  SiSass,
  SiTwitch,
  SiTypescript,
  SiVscodium,
  SiWakatime,
  SiYoutube,
} from '@icons-pack/react-simple-icons';

type Flavor = 'latte' | 'frappe' | 'macchiato' | 'mocha';
const flavors = [
  { name: 'Catppuccin Latte', className: 'latte' },
  { name: 'Catppuccin Frappé', className: 'frappe' },
  { name: 'Catppuccin Macchiato', className: 'macchiato' },
  { name: 'Catppuccin Mocha', className: 'mocha' },
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
          <img src={'/avatar.png'} alt={'Avatar'} />
          <div>
            <h1>mxgic1337_</h1>
            <div className={'socials'}>
              <IconLink
                icon={<SiTwitch />}
                title={'Twitch'}
                url={'https://twitch.tv/mxgic1337_'}
              />
              <IconLink
                icon={<SiYoutube />}
                title={'YouTube'}
                url={'https://youtube.com/@mxgic1337_'}
              />
              <IconLink
                icon={<SiGithub />}
                title={'GitHub'}
                url={'https://github.com/mxgic1337'}
              />
              <IconLink
                icon={<SiWakatime />}
                title={'WakaTime'}
                url={'https://wakatime.com/@mxgic1337'}
              />
            </div>
          </div>
        </div>
        <section>
          <SectionTitle text={'I code in:'} icon={<SiVscodium />} />
          <div className={'languages'}>
            <Language
              icon={<SiTypescript />}
              text={'TypeScript'}
              libraries={[
                { icon: <SiNodedotjs />, text: 'NodeJS' },
                { icon: <SiReact />, text: 'React' },
              ]}
            />
            <Language icon={<SiOpenjdk />} text={'Java'} />
            <Language
              icon={<SiCss3 />}
              text={'CSS'}
              libraries={[
                { icon: <SiLess />, text: 'Less' },
                { icon: <SiSass />, text: 'Sass' },
              ]}
            />
          </div>
        </section>
        <section>
          <SectionTitle text={'Projects / I work on:'} icon={<SiGithub />} />
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
              href={'https://github.com/mxgic1337/mxgic1337.xyz'}
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
