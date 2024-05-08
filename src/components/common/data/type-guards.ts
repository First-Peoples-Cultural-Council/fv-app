import { FvWord, FvWordLocationCombo } from './types';

export function isFvWord(obj: any): obj is FvWord {
  return (
    obj &&
    typeof obj === 'object' &&
    'source' in obj &&
    'entryID' in obj &&
    'word' in obj
  );
}

export function isFvWordLocationCombo(obj: any): obj is FvWordLocationCombo {
  return (
    obj &&
    typeof obj === 'object' &&
    'entry' in obj &&
    'locations' in obj &&
    isFvWord(obj.entry) &&
    Array.isArray(obj.locations) &&
    obj.locations.length >= 1
  );
}
