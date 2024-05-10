import React, { useRef, useContext, useEffect, useState } from 'react';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

// FPCC
import classNames from 'classnames';
import styles from './alphabet-view.module.css';
import { useIsMobile } from '../../util/useMediaQuery';
import { FvLetter, FvWordLocationCombo } from '../common/data';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import fetchWordsData from '../../services/wordsApiService';
import fetchCharactersData from '../../services/charactersApiService';
import { Keyboard } from './keyboard';
import { SelectedLetterDisplay } from './selected-letter-display';
import { ApiContext } from '../contexts/apiContext';
import { WordExampleList } from './word-example-list';
import { WordStartsWithList } from './word-starts-with-list';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

export function AlphabetView(this: any, props: AlphabetViewProps) {
  const { isApiCallInProgress } = useContext(ApiContext);
  const wordListRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const [dataDictionary, setDataDictionary] = useState<
    (DictionaryEntryExportFormat | FvWordLocationCombo)[]
  >([]);
  const [dataAlphabet, setDataAlphabet] = useState<FvLetter[]>([]);
  const [selected, setSelected] = useState<FvLetter | null>(null);
  const [loadingAlphabet, setLoadingAlphabet] = useState(true);
  const [loadingDictionary, setLoadingDictionary] = useState(true);

  if (!isMobile && selected === null && dataAlphabet.length !== 0) {
    setSelected(dataAlphabet[0]);
  }

  useEffect(() => {
    const fetchDataAlphabetAsync = async () => {
      try {
        const result = await fetchCharactersData();
        setDataAlphabet(result);
      } catch (error) {
        // Handle error scenarios
        console.error('Error occurred:', error);
      }
      setLoadingAlphabet(false);
    };

    const fetchDataDictAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress);
        setDataDictionary(result.data);
      } catch (error) {
        // Handle error scenarios
        console.error('Error occurred:', error);
      }
      setLoadingDictionary(false);
    };

    if (dataAlphabet.length === 0) {
      fetchDataAlphabetAsync();
      fetchDataDictAsync();
    }
  }, [isApiCallInProgress]);

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
        <div
          className={classNames(
            'overflow-y-auto col-span-1 w-full',
            styles['smallContainer']
          )}
        >
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
          <div
            className={classNames(
              'overflow-y-auto col-span-1',
              styles['largeContainer']
            )}
          >
            {selected && (
              <SelectedLetterDisplay
                selected={selected}
                dataDictionary={dataDictionary}
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
              className={classNames(
                'overflow-y-auto col-span-2',
                styles['largeContainer']
              )}
            >
              {selected?.relatedDictionaryEntries.length > 0 && (
                <WordExampleList
                  selected={selected}
                  dataDictionary={dataDictionary}
                  loading={loadingDictionary}
                />
              )}
              {selected?.note?.length > 0 && note()}
              <WordStartsWithList
                selected={selected}
                dataDictionary={dataDictionary}
                loading={loadingDictionary}
              />
            </div>
          )}
        </div>
      </div>
      {/* Mobile - Character Detail Modal */}
      {selected && isMobile && (
        <FullScreenModal onClose={() => setSelected(null)} actions={<></>}>
          <div>
            <SelectedLetterDisplay
              selected={selected}
              dataDictionary={dataDictionary}
            />
            {selected?.relatedDictionaryEntries.length > 0 && (
              <WordExampleList
                selected={selected}
                dataDictionary={dataDictionary}
                loading={loadingDictionary}
              />
            )}
            {selected?.note?.length > 0 && note()}
            <WordStartsWithList
              selected={selected}
              dataDictionary={dataDictionary}
              loading={loadingDictionary}
            />
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
