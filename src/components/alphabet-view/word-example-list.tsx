import React, { useContext, useEffect, useState } from 'react';
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
export interface WordExampleListProps {
  selected: FvLetter;
}

export function WordExampleList({ selected }: Readonly<WordExampleListProps>) {
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

  return (
    <div className="w-full">
      <div className="p-5">
        <span className="text-xl pr-2">EXAMPLE WORDS WITH</span>
        <span className="text-5xl bold">{selected?.title}</span>
      </div>
      {loading && <LoadingSpinner />}
      {!loading &&
        selected?.relatedDictionaryEntries.map((example) => {
          let term;
          term = dataDict.find((item) => {
            if (isFvWord(item)) {
              return item.entryID === example.id;
            }
            if (isFvWordLocationCombo(item)) {
              return item.entry.entryID === example.id;
            }
            return false;
          });
          if (term === undefined) {
            return null;
          }
          return (
            <div
              key={`${example.type}-${example.id}-example`}
              id={`${example.type}-${example.id}`}
            >
              <WordAlphabetRowCard term={term} />
            </div>
          );
        })}
    </div>
  );
}

export default WordExampleList;
