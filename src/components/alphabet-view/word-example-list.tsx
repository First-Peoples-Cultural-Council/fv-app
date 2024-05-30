import React from 'react';
import WordAlphabetRowCard from './word-row-card';
import {
  FvLetter,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

/* eslint-disable-next-line */
export interface WordExampleListProps {
  dictionaryData: (DictionaryEntryExportFormat | FvWordLocationCombo)[];
  selected: FvLetter;
}

export function WordExampleList({
  dictionaryData,
  selected,
}: Readonly<WordExampleListProps>) {
  return (
    <div className="w-full">
      <div className="p-5">
        <span className="text-xl pr-2">EXAMPLE WORDS WITH</span>
        <span className="text-5xl bold">{selected?.title}</span>
      </div>
      {selected?.relatedDictionaryEntries.map((example) => {
        let term;
        term = dictionaryData.find((item) => {
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
