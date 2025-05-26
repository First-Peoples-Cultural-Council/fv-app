import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

// FPCC
import useOnClickOutside from 'util/clickOutside'
import { Bookmark, Flashcard, FvCategory, FvWord } from 'components/common/data'
import shuffle from 'util/shuffle'
import fetchCategoryData from 'services/categoriesApiService'
import fetchWordsData from 'services/wordsApiService'
import IndexedDBService from 'services/indexedDbService'
import { ApiContext } from 'components/contexts/apiContext'
import { FlashcardView } from 'components/flashcards-view/flashcard-view'
import Modal from 'components/common/modal/modal'
import { useAudioContext } from 'components/contexts/audioContext'

export function FlashcardsView() {
  const [showSelectModal, setShowSelectModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showFlashcardModal, setShowFlashcardModal] = useState(false)
  const [showDonePromptModal, setShowDonePromptModal] = useState(false)

  const [selectedFlashcardType, setSelectedFlashcardType] = useState<string>()
  const [selectedFlashcardDisplayType, setSelectedFlashcardDisplayType] = useState('')
  const [db, setDb] = useState<IndexedDBService>()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [dataDict, setDataDict] = useState<FvWord[]>([])
  const [data, setData] = useState<FvWord[]>([])
  const [initialFilteredData, setInitialFilteredData] = useState<FvWord[]>([])
  const [dataForFlashcardGroup, setDataForFlashcardGroup] = useState<any>()
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0)
  const [flashcardData, setFlashcardData] = useState<Flashcard>()
  const [dataCategories, setDataCategories] = useState<any>([])

  const { isApiCallInProgress } = useContext(ApiContext)
  const { stopAll } = useAudioContext()

  const SelectModalRef = useRef<HTMLDivElement>(null)
  const CategoryModalRef = useRef<HTMLDivElement>(null)

  const flashcardsBatchSize = 25

  useEffect(() => {
    fetchCategoryData().then((result) => {
      setDataCategories(result)
    })
  }, [])

  useOnClickOutside(SelectModalRef, () => {
    setShowSelectModal(false)
  })
  useOnClickOutside(CategoryModalRef, () => {
    setShowCategoryModal(false)
  })

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'))

    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress)
        setDataDict(result.data)
      } catch (error) {
        // Handle error scenarios
        console.error(error)
      }
    }

    fetchDataAsync()
  }, [isApiCallInProgress])

  useEffect(() => {
    const usersBookmarks = async () => {
      if (db) {
        await setUsersBookmarks()
      }
    }
    usersBookmarks().catch((err) => {
      console.error(err)
    })
  }, [db])

  useEffect(() => {
    if (dataForFlashcardGroup) {
      if (selectedFlashcardDisplayType === '') {
        setShowSelectModal(true)
      } else {
        setDataForFlashcard(0)
      }
    }
  }, [dataForFlashcardGroup])

  useEffect(() => {
    if (selectedFlashcardDisplayType !== '') {
      setShowSelectModal(false)
      let filteredData = initialFilteredData

      if (selectedFlashcardDisplayType === 'a2e') {
        filteredData = initialFilteredData.filter((entry) => entry.audio && entry.audio.length > 0)
        saveDataForFlashcards(filteredData)
      }

      setDataForFlashcard(0)
    }
  }, [selectedFlashcardDisplayType])

  useEffect(() => {
    if (flashcardData) {
      setShowFlashcardModal(true)
    }
  }, [flashcardData])

  async function setUsersBookmarks() {
    setBookmarks((await db?.getBookmarks()) ?? [])
  }

  return (
    <div>
      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          {flashCardType('Words', 'fv-wordsfc', () => {
            handleFlashcardTypeSelection(dataDict.filter((entry) => entry.source === 'words'))
          })}
          {flashCardType('Phrases', 'fv-phrasesfc', () => {
            handleFlashcardTypeSelection(dataDict.filter((entry) => entry.source === 'phrases'))
          })}
          {flashCardType('Category', 'fv-categories', () => {
            setSelectedFlashcardDisplayType('')
            setShowCategoryModal(true)
          })}
          {flashCardType('Bookmarks', 'fv-bookmark', () => {
            handleFlashcardTypeSelection(
              dataDict.filter((entry) => bookmarks.some((bookmark) => bookmark.id === entry.entryID))
            )
          })}
        </div>
      </div>

      {showSelectModal && (
        <Modal closeOnOutsideClick={false} onClose={() => setShowSelectModal(false)}>
          <div ref={SelectModalRef} className="bg-white rounded-lg overflow-y-auto">
            <div className="w-full text-center uppercase text-primary-500 text-2xl">{selectedFlashcardType}</div>
            <div className="max-w-sm mx-auto grid grid-cols-1 gap-2 p-6">
              {menuItem('English to Language', 'fv-refresh-counter-clockwise', () => {
                setSelectedFlashcardDisplayType('e2l')
              })}
              {menuItem('Language to English', 'fv-refresh-clockwise', () => {
                setSelectedFlashcardDisplayType('l2e')
              })}
              {menuItem('Audio to English', 'fv-volume-up', () => {
                setSelectedFlashcardDisplayType('a2e')
              })}
              {menuItem('Mix', 'fv-mix', () => {
                setSelectedFlashcardDisplayType('mix')
              })}
            </div>
          </div>
        </Modal>
      )}

      {showCategoryModal && (
        <Modal closeOnOutsideClick={false} onClose={() => setShowCategoryModal(false)}>
          <div ref={CategoryModalRef} className="bg-white rounded-lg overflow-y-auto">
            <div className="w-full text-center uppercase text-primary-500 text-2xl">{selectedFlashcardType}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              {dataCategories.map((category: FvCategory) => {
                return (
                  <div key={category.id}>
                    {menuItem(category.title, 'fv-categories', () => {
                      const categoryData = dataDict.filter((term) => {
                        return term.theme === category.title || term.secondary_theme === category.title
                      })
                      setSelectedFlashcardType(category.title)
                      saveDataForFlashcards(categoryData)
                      setShowCategoryModal(false)
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </Modal>
      )}
      {showFlashcardModal && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="fixed inset-0 w-full h-full backdrop">
          <div className="grid h-screen md:place-items-center outline-none focus:outline-none">
            <div className="group h-4/5 w-full md:w-[36rem] [perspective:1000px] mt-6 mb-10 p-4">
              <div className="flex justify-end w-full">
                <p className="items-end mx-auto pl-6 flex font-bold text-white text-xl">
                  {flashcardIndex + 1}/{dataForFlashcardGroup.length}
                </p>
                <div className="grid h-10 w-10 bg-gray-50 float-right rounded-full mb-2 md:place-items-center">
                  <button
                    className="p-2 ml-auto bg-transparent border-0 text-black float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowFlashcardModal(false)}
                  >
                    <i className="fv-close"></i>
                  </button>
                </div>
              </div>
              <FlashcardView
                flashcardData={flashcardData}
                setFlashcard={setDataForFlashcard}
                flashcardIndex={flashcardIndex}
              />
            </div>
          </div>
        </div>
      )}

      {showDonePromptModal && (
        <Modal closeOnOutsideClick={false} onClose={() => setShowDonePromptModal(false)}>
          <div ref={CategoryModalRef} className="w-full overflow-y-auto bg-white text-charcoal-500 rounded-lg">
            <div>
              <div className="w-full text-center text-2xl bold">Congratulations!</div>
              <div className="w-full text-center text-xl">Set complete.</div>
              {data.length === 0 && (
                <div className="text-center text-charcoal-400 pt-4">
                  You’ve gone through all the cards for this category.
                </div>
              )}
            </div>
            <div className="max-w-sm mx-auto grid grid-cols-1 gap-2 p-6">
              {menuItem('Restart Set', 'fv-ccw', () => {
                setDataForFlashcard(0)
                setShowDonePromptModal(false)
                setShowFlashcardModal(true)
              })}
              {data.length !== 0 &&
                menuItem('Next Set', 'fv-right-big', () => {
                  saveDataForFlashcards(data)
                  setShowDonePromptModal(false)
                })}
              {menuItem('Done', 'fv-check', () => {
                setShowDonePromptModal(false)
              })}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )

  function saveDataForFlashcards(data: any[]) {
    // Don't continue if there is no data to show.
    if (data.length === 0) {
      return
    }

    const shuffledData = shuffle(data)
    const flashcardSet = shuffledData.slice(0, flashcardsBatchSize)
    const remainingData = shuffledData.slice(flashcardsBatchSize + 1)
    setData(remainingData)
    setDataForFlashcardGroup(flashcardSet)
  }

  function handleFlashcardTypeSelection(data: FvWord[]) {
    setSelectedFlashcardDisplayType('')
    setInitialFilteredData(data)
    saveDataForFlashcards(data)
  }

  function flashCardType(name: string, icon: string, getTypeData: Function) {
    return (
      <button
        onClick={() => {
          getTypeData()
          setSelectedFlashcardType(name)
        }}
        className="w-44 h-44 md:w-80 md:h-40 m-2 content-center grid grid-cols-1 md:grid-cols-2 cursor-pointer justify-center text-white bg-tertiaryB-500 py-2 px-4 rounded-lg shadow text-center"
      >
        <i className={classNames(icon, 'text-6xl ')} />

        <div className="pt-2 text-lg md:text-2xl">{name}</div>
      </button>
    )
  }

  function menuItem(name: string, icon: string, onClick: Function) {
    return (
      <div className="col-span-1">
        <button className="btn-outlined border-2 h-full w-full justify-start text-left" onClick={() => onClick()}>
          <div className={classNames('text-3xl text-primary', icon)}></div>
          <div className="text-xl">{name}</div>
        </button>
      </div>
    )
  }

  function setDataForFlashcard(fcIndex: number) {
    // Stop all audio when flashcard changes
    stopAll()
    if (fcIndex === dataForFlashcardGroup.length) {
      setShowFlashcardModal(false)
      setShowDonePromptModal(true)
    } else {
      setFlashcardIndex(fcIndex)

      // If set to mix select one of the type randomly.
      let displayType = selectedFlashcardDisplayType
      if (selectedFlashcardDisplayType === 'mix') {
        const index: number = randomIntFromInterval(0, 2)
        const types: string[] = ['e2l', 'l2e', 'a2e']
        displayType = types[index]
      }
      switch (displayType) {
        case 'e2l': {
          setFlashcardData({
            type: 'word',
            frontWord: dataForFlashcardGroup[fcIndex].definition ?? '',
            backWord: dataForFlashcardGroup[fcIndex].word ?? '',
            audio: null,
          })
          break
        }

        case 'l2e': {
          setFlashcardData({
            type: 'word',
            frontWord: dataForFlashcardGroup[fcIndex].word ?? '',
            backWord: dataForFlashcardGroup[fcIndex].definition ?? '',
            audio: null,
          })
          break
        }

        case 'a2e': {
          setFlashcardData({
            type: 'audio',
            frontWord: (dataForFlashcardGroup[fcIndex].audio?.length ? '' : dataForFlashcardGroup[fcIndex].word) ?? '',
            backWord: dataForFlashcardGroup[fcIndex].definition ?? '',
            audio: dataForFlashcardGroup[fcIndex].audio,
          })
          break
        }
      }
    }
  }

  // Min and max are included
  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

export default FlashcardsView
