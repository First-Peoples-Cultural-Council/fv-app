import { ChangeEvent, useContext, useState } from 'react'
import classNames from 'classnames'

// FPCC
import { SearchContext } from 'components/contexts/searchContext'

export function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>('')
  const searchContext = useContext(SearchContext)

  const onSearchInputChange = (event: ChangeEvent<any>) => {
    setSearchValue(event?.target?.value)
  }

  const clearSearch = () => {
    setSearchValue('')
    if (searchContext) searchContext.clearSearch()
  }

  const submitSearch = (query: string) => {
    if (query?.length > 0 && searchContext) {
      searchContext.submitSearch(query)
    } else {
      clearSearch()
    }
  }

  const onKeyUp = (event: any) => {
    if (event?.keyCode === 13 || event?.key === 'Enter') {
      submitSearch(event?.target?.value)
    }
  }

  const clickSearch = () => {
    submitSearch(searchValue)
  }

  return (
    <div className="group relative flex items-center w-full max-w-md">
      <input
        value={searchValue}
        onChange={onSearchInputChange}
        onKeyUp={onKeyUp}
        placeholder="Search"
        className="p-2 rounded-l-lg h-7 border border-gray-400 w-full shadow-inner"
        id="search-input"
      />
      <button
        onClick={clearSearch}
        className={classNames('opacity-0 absolute right-12 top-1/4 text-xs cursor-pointer', {
          'opacity-100': searchValue,
        })}
      >
        <i className="fv-close text-gray-500" />
      </button>
      <button
        onClick={clickSearch}
        className="p-2 h-7 rounded-r-lg bg-white border border-gray-400 border-l-0 flex items-center"
      >
        <i className="fv-search text-text-gray" />
      </button>
    </div>
  )
}

export default SearchInput
