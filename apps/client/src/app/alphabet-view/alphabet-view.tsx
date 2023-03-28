import { FvLetter } from '@fv-app/common-components';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import styles from '../dictionary-view/dictionary-view.module.css';
import { dataAlphabet } from '../temp-alphabet-list';
import { dataDict } from '../temp-word-list';
import WordAlphabetRowCard from './word-row-card';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

export function AlphabetView(props: AlphabetViewProps) {
  const [selected, setSelected] = useState<FvLetter>(dataAlphabet[0]);
  const [data, setData] = useState(dataDict);

  return (
    <div className={styles['container']}>
      <div className="block sm:hidden">{keyboard()}</div>
      <div className="hidden sm:block">
        <div className="flex flex-row">
          <div>
            {selectedLetterDisplay()}
            {keyboard()}
          </div>
          <div>
            {data
              // .filter((term) => {

              // })
              .map((term) => {
                return (
                  <Fragment key={`${term.source}-${term.entryID}`}>
                    <WordAlphabetRowCard term={term} />
                  </Fragment>
                );
              })}{' '}
          </div>
        </div>
      </div>
    </div>
  );

  function selectedLetterDisplay() {
    return (
      <>
        <div className="flex text-8xl justify-center pb-6">{selected.letter}</div>
        <div className="grid grid-cols-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(selected.letter);
            }}
          >
            <span className="fv-copy text-4xl" />
          </button>
          {selected.audio.map((fvAudio) => {
            return (
              <button
                key={fvAudio.filename}
                onClick={() => playAudio(fvAudio.filename)}
              >
                <span className="fv-volume-up text-4xl justify-self-end cursor-pointer" />
              </button>
            );
          })}
        </div>
      </>
    );
  }

  function keyboard() {
    return (
      <div className="mt-5 mb-5 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-4 gap-2">
        {dataAlphabet.map((letterData) => {
          return (
            <button
              className={classNames(
                'border col-span-1 font-medium inline-flex justify-center p-3 sm:p-5 xl:p-3 rounded shadow text-2xl',
                {
                  'bg-cyan-900 text-white hover:bg-cyan-700':
                    letterData === selected,
                  'hover:bg-gray-200': letterData !== selected,
                }
              )}
              onClick={() => {
                setSelected(letterData);
              }}
            >
              {letterData.letter}
            </button>
          );
        })}
      </div>
    );
  }

  async function playAudio(fileName: string) {
    const audio = new Audio(fileName);
    audio.play();
  }
}

export default AlphabetView;
