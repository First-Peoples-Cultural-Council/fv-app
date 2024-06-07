import { FvWord } from './types';

export function isFvWord(obj: any): obj is FvWord {
  return (
    obj &&
    typeof obj === 'object' &&
    'source' in obj &&
    'entryID' in obj &&
    'word' in obj
  );
}
