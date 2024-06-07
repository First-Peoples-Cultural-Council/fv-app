import React, { useRef, useContext, useEffect, useState } from 'react';

// FPCC
import { useIsMobile } from '../../util/useMediaQuery';
import { FvLetter } from '../common/data';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { ApiContext } from '../contexts/apiContext';
import fetchCharactersData from '../../services/charactersApiService';
import { useDictionaryData } from '../dictionary-page/dictionary-page';
import { Keyboard } from './keyboard';
import { SelectedLetterDisplay } from './selected-letter-display';
import { WordExampleList } from './word-example-list';
import { WordStartsWithList } from './word-starts-with-list';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

export function AlphabetView(this: any, props: AlphabetViewProps) {
  const { dictionaryData } = useDictionaryData();
  const { isApiCallInProgress } = useContext(ApiContext);
  const wordListRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const [dataAlphabet, setDataAlphabet] = useState<FvLetter[]>([]);
  const [selected, setSelected] = useState<FvLetter | null>(null);
  const [loadingAlphabet, setLoadingAlphabet] = useState(true);

  if (!isMobile && selected === null && dataAlphabet.length !== 0) {
    setSelected(dataAlphabet[0]);
  }

  useEffect(() => {
    const fetchDataAlphabetAsync = async () => {
      try {
        const result = await fetchCharactersData();
        // Add character sort_form number for getting "starts with" entries
        const alphabetWithIndex = result.map((char, index) => {
          return { ...char, sortingFormNum: index + 1 };
        });
        setDataAlphabet(alphabetWithIndex);
      } catch (error) {
        // Handle error scenarios
        console.error('Error occurred:', error);
      }
      setLoadingAlphabet(false);
    };

    if (dataAlphabet.length === 0) {
      fetchDataAlphabetAsync();
    }
  }, [isApiCallInProgress, dataAlphabet]);

  useEffect(() => {
    if (selected && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selected, isMobile]);

  return (
    <>
      {/* Mobile */}
      <div className="flex md:hidden justify-center w-full">
        <div className="overflow-y-auto col-span-1 w-full">
          <Keyboard
            selected={selected}
            setSelected={setSelected}
            dataAlphabet={dataAlphabet}
            loading={loadingAlphabet}
            wordListRef={wordListRef}
          />
        </div>
      </div>
      {/* Tablet */}
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-3">
          <div className="overflow-y-auto col-span-1 w-full space-y-4">
            {selected && (
              <SelectedLetterDisplay
                selected={selected}
                dictionaryData={dictionaryData}
              />
            )}

            <Keyboard
              selected={selected}
              setSelected={setSelected}
              dataAlphabet={dataAlphabet}
              loading={loadingAlphabet}
              wordListRef={wordListRef}
            />
          </div>
          {selected && (
            <div
              ref={wordListRef}
              className="overflow-y-auto col-span-2 w-full"
            >
              {selected?.relatedDictionaryEntries.length > 0 && (
                <WordExampleList selected={selected} />
              )}
              {selected?.note?.length > 0 && note()}
              <WordStartsWithList selected={selected} />
            </div>
          )}
        </div>
      </div>
      {/* Mobile - Character Detail Modal */}
      {selected && isMobile && (
        <FullScreenModal onClose={() => setSelected(null)}>
          <div>
            <SelectedLetterDisplay
              selected={selected}
              dictionaryData={dictionaryData}
            />
            {selected?.relatedDictionaryEntries.length > 0 && (
              <WordExampleList selected={selected} />
            )}
            {selected?.note?.length > 0 && note()}
            <WordStartsWithList selected={selected} />
          </div>
        </FullScreenModal>
      )}
    </>
  );

  function note() {
    return (
      <div className="p-5">
        <div className="text-xl pb-2">NOTES</div>
        <div>{selected?.note}</div>
      </div>
    );
  }
}

export default AlphabetView;
