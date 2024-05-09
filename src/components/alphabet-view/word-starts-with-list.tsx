import React, { Fragment, useContext, useEffect, useState } from 'react';
import WordAlphabetRowCard from './word-row-card';
import {
  FvLetter,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';
import fetchWordsData from '../../services/wordsApiService';
import { DictionaryEntryExportFormat } from '@mothertongues/search';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import { ApiContext } from '../contexts/apiContext';

/* eslint-disable-next-line */
export interface WordStartsWithListProps {
  selected: FvLetter;
}

let dataAlphabetMap: Record<string, FvLetter>;

export function WordStartsWithList({
  selected,
}: Readonly<WordStartsWithListProps>) {
  const [dataDict, setDataDict] = useState<
    (DictionaryEntryExportFormat | FvWordLocationCombo)[]
  >([]);

  const [loading, setLoading] = useState(true);
  const { isApiCallInProgress } = useContext(ApiContext);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress);
        setDataDict(result.data);
      } catch (error) {
        // Handle error scenarios
        console.error('Error occurred:', error);
      }
      setLoading(false);
    };

    if (!dataDict || dataDict.length <= 1) {
      fetchDataAsync();
    } else {
      setLoading(false);
    }
  }, [isApiCallInProgress]);

  function getAlphabetSort(a: string, b: string, letterIndex: number): number {
    const aOrder = dataAlphabetMap?.[a[letterIndex]]?.sortOrder;
    const bOrder = dataAlphabetMap?.[b[letterIndex]]?.sortOrder;
    if (aOrder === undefined) {
      return 1;
    } else if (bOrder === undefined) {
      return -1;
    } else if (aOrder === bOrder) {
      return getAlphabetSort(a, b, letterIndex + 1);
    } else {
      return aOrder - bOrder;
    }
  }

  return (
    <div className="w-full">
      <div className="p-5">
        <span className="text-xl pr-2">WORDS STARTING WITH</span>
        <span className="text-5xl bold">{selected?.title}</span>
      </div>
      {loading && <LoadingSpinner />}
      {!loading &&
        dataDict
          ?.filter((term) => {
            if (isFvWordLocationCombo(term)) {
              return term?.entry?.word?.startsWith(selected?.title ?? '');
            }
            return term?.word?.startsWith(selected?.title ?? '');
          })
          .sort((a, b) => {
            if (isFvWordLocationCombo(a) && isFvWordLocationCombo(b)) {
              return getAlphabetSort(a.entry.word, b.entry.word, 1);
            }
            if (isFvWord(a) && isFvWord(b)) {
              return getAlphabetSort(a.word, b.word, 1);
            }
            return 0;
          })
          .map((term) => {
            return (
              <Fragment
                key={
                  isFvWordLocationCombo(term)
                    ? `${term.entry.source}-${term.entry.entryID}`
                    : `${term.source}-${term.entryID}`
                }
              >
                <WordAlphabetRowCard term={term} />
              </Fragment>
            );
          })}{' '}
    </div>
  );
}

export default WordStartsWithList;
