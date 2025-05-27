// FPCC
import { FvWord } from 'components/common/data'

function sortByCustomOrder(a: FvWord, b: FvWord) {
  const len = Math.min(a.sorting_form.length, b.sorting_form.length)
  for (let i = 0; i < len; i++) {
    if (a.sorting_form[i] !== b.sorting_form[i]) {
      return a.sorting_form[i] - b.sorting_form[i]
    }
  }
  return a.sorting_form.length - b.sorting_form.length
}

export default sortByCustomOrder
