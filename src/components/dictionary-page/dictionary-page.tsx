import { useState, useEffect, useContext } from 'react'
import { matchRoutes, Outlet, useLocation, useOutletContext } from 'react-router'
import { constructSearchers, DictionaryEntryExportFormat, MTDSearch } from '@mothertongues/search'

// FPCC
import SubNavDesktop from 'components/sub-nav-desktop/sub-nav-desktop'
import SubNavMobile from 'components/sub-nav-mobile/sub-nav-mobile'
import WordOfTheDay from 'components/dictionary-page/word-of-the-day'
import { dictionarySubNavItems } from 'constants/navigation'
import SearchInput from 'components/common/search-input/search-input'
import PageHeader from 'components/common/page-header/page-header'
import { FvWord } from 'components/common/data'
import { ApiContext } from 'components/contexts/apiContext'
import fetchWordsData from 'services/wordsApiService'
import { LoadingSpinner } from 'components/common/loading-spinner/loading-spinner'
import SearchProvider from 'components/contexts/searchContext'

type ContextType = {
  dictionaryData: FvWord[] | []
  dictionaryHash: {
    [key: string]: DictionaryEntryExportFormat
  }
}

export function Dictionary() {
  const [dictionaryData, setDictionaryData] = useState<FvWord[] | []>([])
  const [dictionaryHash, setDictionaryHash] = useState<{
    [key: string]: DictionaryEntryExportFormat
  }>({})
  const [searchers, setSearchers] = useState<MTDSearch[]>()
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const { isApiCallInProgress } = useContext(ApiContext)

  const getDictionaryHash = (dictionaryData: FvWord[] | []) => {
    // The endpoint just returns a list
    // But to quickly fetch items in the local data, we create a hash
    // with the entry IDs. Not sure if you'll want to create the hash here
    // or somewhere else, but I'll just leave it here for now.
    const entriesHash: { [key: string]: DictionaryEntryExportFormat } = {}
    dictionaryData.forEach((entry) => {
      entriesHash[entry.entryID] = entry
    })
    return entriesHash
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress)
        const dictionaryHash = getDictionaryHash(result.data)
        const searchers = constructSearchers(result)
        setDictionaryData(result.data)
        setDictionaryHash(dictionaryHash)
        setSearchers(searchers)
        setLoading(false)
      } catch (error) {
        console.info(error)
      }
    }

    fetchDataAsync()
  }, [isApiCallInProgress])

  const currentNavItem =
    dictionarySubNavItems.find((item) =>
      matchRoutes([{ path: item.path }, ...(item?.activePathMatches ?? [])], location)
    ) ?? dictionarySubNavItems[0]

  return !searchers || loading ? (
    <LoadingSpinner />
  ) : (
    <SearchProvider dictionaryHash={dictionaryHash} searchers={searchers}>
      <div>
        <SubNavMobile navItems={dictionarySubNavItems} />
        <PageHeader
          title={currentNavItem.title}
          backgroundColors={{
            to: currentNavItem.colors.to,
            from: currentNavItem.colors.from,
          }}
        >
          {!!matchRoutes([{ path: '' }, { path: 'dictionary' }], location) && <SearchInput />}
        </PageHeader>

        <div className="flex w-full">
          <SubNavDesktop navItems={dictionarySubNavItems} />
          <Outlet context={{ dictionaryData, dictionaryHash } satisfies ContextType} />
        </div>

        {dictionaryData?.length > 0 && <WordOfTheDay dictionaryData={dictionaryData} />}
      </div>
    </SearchProvider>
  )
}

export default Dictionary

export function useDictionaryData() {
  return useOutletContext<ContextType>()
}
