import { FvLetter } from '@fv-app/common-components';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import styles from '../dictionary-view/dictionary-view.module.css';
import { dataAlphabet } from '../temp-alphabet-list';
import { dataDict } from '../temp-word-list';
import WordAlphabetRowCard from './word-row-card';
import _ from 'lodash';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

export function AlphabetView(props: AlphabetViewProps) {
  const [selected, setSelected] = useState<FvLetter>(dataAlphabet[0]);
  const [data, setData] = useState(dataDict);

  return (
    <>
      <div className="block md:hidden flex justify-center w-full">
        {keyboard()}
      </div>
      <div className="hidden md:block w-full">
        <div className="flex flex-row">
          <div>
            {selectedLetterDisplay()}
            {keyboard()}
          </div>
          <div className="w-full">
            <div className="p-5">
              <span className="text-xl pr-2">WORDS STARTING WITH</span>
              <span className="text-5xl bold">{selected.letter}</span>
            </div>
            {data
              .filter((term) => {
                return term.word.startsWith(selected.letter);
              })
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
    </>
  );

  function selectedLetterDisplay() {
    return (
      <>
        <div className="flex text-8xl justify-center pb-6">
          {selected.letter}
        </div>
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
    const alphabetRows: FvLetter[][] = _.chunk(dataAlphabet, 4);

    return (
      <div className="mt-5 mb-5">
        {alphabetRows.map((row) => {
          let showLetterDisplay = false;
          return (
            <>
              <div className="grid gap-4 md:gap-2 grid-cols-4 pb-4">
                {row.map((letterData) => {
                  if (letterData === selected) {
                    showLetterDisplay = true;
                  }
                  return (
                    <button
                      className={classNames(
                        'border col-span-1 font-medium inline-flex justify-center p-5 md:p-3 rounded shadow text-2xl',
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
              {showLetterDisplay && (
                <div className="pb-10">{selectedLetterDisplay()}</div>
              )}
            </>
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
