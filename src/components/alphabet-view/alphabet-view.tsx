import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import { dataAlphabet } from '../temp-alphabet-list';
import { dataDict } from '../temp-word-list';
import WordAlphabetRowCard from './word-row-card';
import _ from 'lodash';
import { useIsMobile } from '../../util/useMediaQuery';
import { FvAudio, FvLetter } from '../common/data/types';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { useButtonStyle } from '../common/hooks/useButtonStyle';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

export function AlphabetView(props: AlphabetViewProps) {
  const [selected, setSelected] = useState<FvLetter | null>(null);
  const [showMobileWordList, setShowMobileWordList] = useState(false);

  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  if (!useIsMobile() && selected === null) {
    setSelected(dataAlphabet[0]);
  }

  useEffect(() => {
    if (showMobileWordList) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showMobileWordList]);

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
          <div>
            {selected?.examples.length !== 0 && exampleWordList()}
            {selected?.notes !== undefined && notes()}
            {wordList()}
          </div>
        </div>
      </div>
      {showMobileWordList && (
        <FullScreenModal
          onClose={() => setShowMobileWordList(false)}
          actions={<></>}
        >
          {wordList()}
        </FullScreenModal>
      )}
    </>
  );

  function selectedLetterDisplay() {
    const audioCount = selected?.audio.length ?? 0;

    return (
      <>
        <button
          className="fv-close float-right block md:hidden"
          onClick={() => {
            setSelected(null);
            setShowMobileWordList(false);
          }}
        />
        <div className="flex text-8xl justify-center pb-6">
          {selected?.letter}
        </div>
        {audioCount === 0 && (
          <div className="flex w-full justify-center">{copyButton()}</div>
        )}
        {audioCount === 1 && (
          <div className="grid grid-cols-2">
            {copyButton()}
            {selected?.audio.map((fvAudio) => {
              return audioButton(fvAudio);
            })}
          </div>
        )}
        {audioCount > 1 && (
          <>
            <div className="flex w-full justify-center">{copyButton()}</div>
            <div className="flex justify-evenly mt-5">
              {selected?.audio.map((fvAudio) => {
                return audioButton(fvAudio);
              })}
            </div>
          </>
        )}
      </>
    );
  }

  function copyButton() {
    return (
      <button
        onClick={() => {
          navigator.clipboard.writeText(selected?.letter ?? '');
        }}
      >
        <span className="fv-copy text-4xl" />
      </button>
    );
  }

  function audioButton(fvAudio: FvAudio) {
    return (
      <button
        key={fvAudio.filename}
        onClick={() => playAudio(fvAudio.filename)}
      >
        <span className="fv-volume-up text-4xl justify-self-end cursor-pointer" />
      </button>
    );
  }

  function keyboard() {
    const alphabetRows: FvLetter[][] = _.chunk(dataAlphabet, 4);

    return (
      <div className="mt-5 mb-5 p-10 md:p-2 w-full">
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
                      key={letterData.letter}
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
                        setShowMobileWordList(false);
                      }}
                    >
                      {letterData.letter}
                    </button>
                  );
                })}
              </div>
              {showLetterDisplay && (
                <div className=" md:hidden">
                  <div className="pb-10 pt-10">{selectedLetterDisplay()}</div>

                  {selected?.examples.length !== 0 && exampleWordList()}
                  {selected?.notes !== undefined && notes()}

                  <div className="w-full flex justify-center pb-8">
                    <button
                      className={tertiaryButtonStyle}
                      onClick={() => setShowMobileWordList(true)}
                    >
                      <span className="pr-2">See all words starting with</span>
                      <span className="text-2xl font-bold">
                        {selected?.letter}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    );
  }

  function exampleWordList() {
    return (
      <div className="w-full">
        <div className="p-5">
          <span className="text-xl pr-2">EXAMPLE WORDS WITH</span>
          <span className="text-5xl bold">{selected?.letter}</span>
        </div>
        {selected?.examples.map((termId) => {
          const term = dataDict.find((word) => word.entryID === termId);
          if (term === undefined) {
            return <div key={termId} />;
          }
          return (
            <Fragment key={`${term.source}-${term.entryID}`}>
              <WordAlphabetRowCard term={term} />
            </Fragment>
          );
        })}
      </div>
    );
  }

  function notes() {
    return (
      <div className="p-5">
        <div className="text-xl pb-2">NOTES</div>
        <div>{selected?.notes}</div>
      </div>
    );
  }

  function wordList() {
    return (
      <div className="w-full">
        <div className="p-5">
          <span className="text-xl pr-2">WORDS STARTING WITH</span>
          <span className="text-5xl bold">{selected?.letter}</span>
        </div>
        {dataDict
          .filter((term) => {
            return term.word.startsWith(selected?.letter ?? '');
          })
          .map((term) => {
            return (
              <Fragment key={`${term.source}-${term.entryID}`}>
                <WordAlphabetRowCard term={term} />
              </Fragment>
            );
          })}{' '}
      </div>
    );
  }

  async function playAudio(fileName: string) {
    const audio = new Audio(fileName);
    audio.play();
  }
}

export default AlphabetView;
