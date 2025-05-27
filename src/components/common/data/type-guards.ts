// FPCC
import { FvWord } from 'components/common/data/types'

export function isFvWord(obj: any): obj is FvWord {
  return obj && typeof obj === 'object' && 'source' in obj && 'entryID' in obj && 'word' in obj
}
