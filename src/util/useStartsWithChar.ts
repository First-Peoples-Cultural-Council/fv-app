import { useEffect, useState } from 'react';

// FPCC
import { FvCharacter, FvWord } from '../components/common/data';

export const useStartsWithChar = (
  dictionaryData: FvWord[],
  character: FvCharacter
) => {
  const [entriesStartingWith, setEntriesStartingWith] = useState<FvWord[]>([]);
  useEffect(() => {
    if (dictionaryData && character.sortingFormNum !== undefined) {
      const entries = [...dictionaryData].filter((entry) => {
        return entry.sorting_form[0] === character.sortingFormNum;
      }).sort((a, b) => {
        const len = Math.min(a.sorting_form.length, b.sorting_form.length);
        for (let i = 0; i < len; i++) {
          if (a.sorting_form[i] !== b.sorting_form[i]) {
            return a.sorting_form[i] - b.sorting_form[i];
          }
        }
        return a.sorting_form.length - b.sorting_form.length;
      });
      setEntriesStartingWith(entries);
    }
  }, [dictionaryData, character.sortingFormNum]);

  return { entriesStartingWith };
};
