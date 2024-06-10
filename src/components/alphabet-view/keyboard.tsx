import React from 'react';
import { FvCharacter } from '../common/data';
import classNames from 'classnames';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';

export interface KeyboardProps {
  selected: FvCharacter | null;
  setSelected: (letter: FvCharacter | null) => void;
  loading: boolean;
  dataAlphabet: FvCharacter[];
  wordListRef: React.RefObject<HTMLDivElement>;
}

export function Keyboard({
  selected,
  setSelected,
  loading,
  dataAlphabet,
  wordListRef,
}: Readonly<KeyboardProps>) {
  const scrollToTop = () => {
    if (wordListRef.current) {
      wordListRef.current.scrollTop = 0;
    }
  };

  const onCharacterClick = (character: FvCharacter) => {
    scrollToTop();
    setSelected(character);
  };

  return (
    <div className="p-6 md:p-2 w-full space-y-2">
      {loading && <LoadingSpinner />}
      {!loading && (
        <div className="grid gap-2 grid-cols-5">
          {dataAlphabet.map((characterData) => {
            return (
              <button
                key={characterData.title}
                id={`character-${characterData.title}`}
                className={classNames(
                  'border col-span-1 font-medium inline-flex justify-center p-5 md:p-3 rounded shadow text-2xl',
                  {
                    'bg-primary-500 text-white hover:bg-primary-400':
                      characterData.title === selected?.title,
                    'hover:bg-gray-200':
                      characterData.title !== selected?.title,
                  }
                )}
                onClick={() => onCharacterClick(characterData)}
              >
                {characterData.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
