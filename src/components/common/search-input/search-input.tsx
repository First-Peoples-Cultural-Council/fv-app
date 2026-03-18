import { ChangeEvent, useContext } from 'react'
import classNames from 'classnames'

// FPCC
import { SearchContext } from 'components/contexts/searchContext'

export function SearchInput() {
  const searchContext = useContext(SearchContext)
  if (!searchContext) return null

  const { searchQuery, updateQuery, submitSearch, clearSearch } = searchContext

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateQuery(event.target.value)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitSearch(event.currentTarget.value)
    }
  }

  return (
    <div className="group relative flex items-center w-full max-w-md">
      <input
        value={searchQuery}
        onChange={onSearchInputChange}
        onKeyUp={onKeyUp}
        placeholder="Search"
        className="p-2 rounded-l-lg h-7 border border-gray-400 w-full shadow-inner"
        id="search-input"
      />
      <button
        onClick={clearSearch}
        className={classNames('opacity-0 absolute right-12 top-1/4 text-xs cursor-pointer', {
          'opacity-100': searchQuery,
        })}
      >
        <i className="fv-close text-gray-500" />
      </button>
      <button
        onClick={() => submitSearch(searchQuery)}
        className="p-2 h-7 rounded-r-lg bg-white border border-gray-400 border-l-0 flex items-center"
      >
        <i className="fv-search text-text-gray" />
      </button>
    </div>
  )
}

export default SearchInput
