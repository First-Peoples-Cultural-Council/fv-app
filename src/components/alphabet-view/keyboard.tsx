import { FvLetter } from '../common/data';
import _ from 'lodash';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { useButtonStyle } from '../common/hooks';
import { SelectedLetterDisplay } from './selected-letter-display';

export interface KeyboardProps {
  selected: FvLetter | null;
  setSelected: (letter: FvLetter) => void;
  exampleWordList: () => JSX.Element;
  note: () => JSX.Element;
  setShowMobileWordList: (show: boolean) => void;
  dataAlphabet: FvLetter[];
  wordListRef: React.RefObject<HTMLDivElement>;
  promptForDownload: () => void;
}

export function Keyboard({
  selected,
  setSelected,
  exampleWordList,
  note,
  setShowMobileWordList,
  dataAlphabet,
  wordListRef,
  promptForDownload,
}: Readonly<KeyboardProps>) {
  const alphabetRows: FvLetter[][] = _.chunk(dataAlphabet, 4);
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');
  const scrollToTop = () => {
    if (wordListRef.current) {
      wordListRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="mt-5 mb-5 p-10 md:p-2 w-full">
      {alphabetRows.map((row) => {
        let showLetterDisplay = false;
        const onClickLetterDataButton = (letterData: FvLetter) => {
          scrollToTop();
          setSelected(letterData);
          setShowMobileWordList(false);
        };

        return (
          <Fragment
            key={`row-${row.map((letterData) => {
              return letterData.title;
            })}`}
          >
            <div className="grid gap-4 md:gap-2 grid-cols-4 pb-4">
              {row.map((letterData) => {
                if (letterData === selected) {
                  showLetterDisplay = true;
                }
                return (
                  <button
                    key={letterData.title}
                    id={`letter-${letterData.title}`}
                    className={classNames(
                      'border col-span-1 font-medium inline-flex justify-center p-5 md:p-3 rounded shadow text-2xl',
                      {
                        'bg-cyan-900 text-white hover:bg-cyan-700':
                          letterData === selected,
                        'hover:bg-gray-200': letterData !== selected,
                      }
                    )}
                    onClick={() => onClickLetterDataButton(letterData)}
                  >
                    {letterData.title}
                  </button>
                );
              })}
            </div>
            {showLetterDisplay && (
              <div className="md:hidden">
                <div className="pb-10 pt-10">
                  <SelectedLetterDisplay
                    selected={selected}
                    setSelected={setSelected}
                    setShowMobileWordList={setShowMobileWordList}
                    promptForDownload={promptForDownload}
                  />
                </div>

                {selected?.relatedDictionaryEntries.length !== 0 &&
                  exampleWordList()}
                {selected?.note !== undefined && note()}

                <div className="w-full flex justify-center pb-8">
                  <button
                    className={tertiaryButtonStyle}
                    onClick={() => setShowMobileWordList(true)}
                  >
                    <span className="pr-2">See all words starting with</span>
                    <span className="text-2xl font-bold">
                      {selected?.title}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
