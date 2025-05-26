import { useState, useEffect } from 'react'

// FPCC
import WordCardMobile from 'components/dictionary-view/word-card-mobile'
import WordCardDesktop from 'components/dictionary-view/word-card-desktop'
import { DictionaryType } from 'components/common/data/enums'
import MultiSwitch from 'components/common/multi-switch/multi-switch'
import { FvWord } from 'components/common/data'
import generateUniqueRandomItems from 'util/randomSet'
import { useDictionaryData } from 'components/dictionary-page/dictionary-page'

export function RandomizedView() {
  const { dictionaryData } = useDictionaryData()
  const [selected, setSelected] = useState<number>(DictionaryType.Both)
  const [data, setData] = useState<FvWord[]>([])
  const [subset, setSubset] = useState<FvWord[]>([])

  const resetScroll = () => {
    const container = document.getElementById('wordList')
    if (container) {
      container.scrollTop = 0
    }
  }

  useEffect(() => {
    switch (selected) {
      case DictionaryType.Words: {
        setData(dictionaryData.filter((entry) => entry.source === 'words'))
        break
      }
      case DictionaryType.Phrases: {
        setData(dictionaryData.filter((entry) => entry.source === 'phrases'))
        break
      }
      default: {
        setData(dictionaryData)
        break
      }
    }
  }, [selected, dictionaryData])

  useEffect(() => {
    setSubset(generateUniqueRandomItems(data, 10))
  }, [data])

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap">
        <MultiSwitch
          selected={selected}
          items={[
            { name: 'WORDS', icon: 'fv-words' },
            { name: 'PHRASES', icon: 'fv-quote-right' },
            { name: 'BOTH', icon: null },
          ]}
          onToggle={(index: number) => {
            resetScroll()
            setSelected(index)
          }}
        />
        <button
          onClick={() => {
            setSubset(generateUniqueRandomItems(data, 10))
          }}
          className="ml-4"
        >
          <i className="fv-arrows-cw text-lg" />
        </button>
      </div>
      <div id="wordList" className="overflow-y-auto max-h-calc-245 md:max-h-calc-195">
        {subset?.map((term) => {
          return (
            <div key={`${term.source}-${term.entryID}`} id={`${term.source}-${term.entryID}`} className="flex w-full">
              <WordCardMobile item={term} />
              <WordCardDesktop item={term} wordWidthClass="w-80" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RandomizedView
