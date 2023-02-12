import styles from './choose-a-language.module.css';
import {
  Language,
  MobileAccordion,
  RightSlider,
} from '@fv-app/common-components';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface ChooseALanguageProps {}

const languages: Language[] = [
  {
    id: '1',
    image:
      'https://www.firstvoices.com/nuxeo/nxpicsfile/default/1d1f39c6-a061-4fd4-9d34-f71d86fd6ecf/Thumbnail:content/',
    label: 'Anishinaabemowin',
    color: 'rgb(1, 1, 1)',
    dialects: [
      {
        id: '1',
        image:
          'https://www.firstvoices.com/nuxeo/nxpicsfile/default/1d1f39c6-a061-4fd4-9d34-f71d86fd6ecf/Thumbnail:content/',
        label: 'PAFNW Anihšināpēmowin',
      },
    ],
  },
  {
    id: '2',
    label: 'Dakelh',
    color: 'rgb(0, 208, 104)',
    dialects: [
      {
        id: '1',
        image:
          'https://www.firstvoices.com/nuxeo/nxpicsfile/default/b922dc5f-5266-4fdd-9937-7a0008dabbc8/Thumbnail:content/',
        label: 'Yekooche',
      },
      {
        id: '2',
        image:
          'https://www.firstvoices.com/nuxeo/nxpicsfile/default/f7ab1e0d-3750-4fa6-91a3-7df6fc3adb18/Thumbnail:content/',
        label: 'Dakelh / Southern Carrier',
      },
    ],
  },
];

export function ChooseALanguage(props: ChooseALanguageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  return (
    <div>
      <h1 className="font-bold text-2xl ml-4 mt-4">Languages</h1>
      <div className="flex flex-wrap sm:flex hidden">
        {languages.map((language) => {
          return (
            <div
              key={language.id}
              className="flex flex-col rounded shadow m-4 bg-white w-[375px] cursor-pointer"
            >
              <div
                className="flex"
                onClick={() =>
                  setSelectedLanguage((prevSelectedLanguage) =>
                    prevSelectedLanguage ? null : language
                  )
                }
              >
                {language.image ? (
                  <img
                    src={language.image}
                    alt={language.label}
                    className="w-[100px] h-[100px]"
                  />
                ) : (
                  <div
                    style={{
                      background:
                        'url(https://www.firstvoices.com/explore/FV/sections/assets/images/cover.png) no-repeat center center/cover',
                    }}
                    className="w-[100px] h-[100px]"
                  />
                )}
                <div className="p-4 flex items-center">{language.label}</div>
              </div>
            </div>
          );
        })}
      </div>
      <RightSlider
        isSliderOpen={!!selectedLanguage}
        onCloseSlider={() => setSelectedLanguage(null)}
        dialects={selectedLanguage?.dialects}
      />
      {languages.map((language) => {
        return (
          <MobileAccordion
            key={language.id}
            image={language.image}
            label={language.label}
            dialects={language.dialects}
          />
        );
      })}
    </div>
  );
}

export default ChooseALanguage;
