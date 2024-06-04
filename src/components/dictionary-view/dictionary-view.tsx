import { useState, useEffect, useContext, useMemo } from 'react';

// FPCC
import WordCardMobile from './word-card-mobile';
import WordCardDesktop from './word-card-desktop';
import { DictionaryType, FvWord, isFvWordLocationCombo } from '../common/data';
import MultiSwitch from '../common/multi-switch/multi-switch';
import { useDictionaryData } from '../dictionary-page/dictionary-page';
import { SearchContext } from '../search-provider';

/* eslint-disable-next-line */
export interface DictionaryViewProps {}

export function DictionaryView(props: DictionaryViewProps) {
  const { dictionaryData } = useDictionaryData();
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [dataUnfiltered, setDataUnfiltered] = useState<FvWord[] | []>(
    dictionaryData
  );
  const [visibleItems, setVisibleItems] = useState(250);
  const searchContext = useContext(SearchContext);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const container = document.getElementById('wordList');
    if (!container) return;
    const containerHeight = container.clientHeight;
    const documentHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - containerHeight - 20) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 20);
    }
  };

  useEffect(() => {
    const container = document.getElementById('wordList');
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter data to display by selected TYPE
  const dataToDisplay: FvWord[] = useMemo(() => {
    setVisibleItems(250);
    const container = document.getElementById('wordList');
    if (container) {
      container.scrollTop = 0;
    }
    const filterByType = (type?: string) => {
      return type
        ? [
            ...dataUnfiltered.filter(
              (entry) =>
                (isFvWordLocationCombo(entry)
                  ? entry.entry.source
                  : entry.source) === type
            ),
          ]
        : [...dataUnfiltered];
    };
    switch (selected) {
      case DictionaryType.Words: {
        return filterByType('words');
      }
      case DictionaryType.Phrases: {
        return filterByType('phrases');
      }
      default: {
        return filterByType();
      }
    }
  }, [selected, dataUnfiltered]);

  // Checking for searchResults
  useEffect(() => {
    if (searchContext?.allResults) {
      if (searchContext.allResults.length > 0) {
        setDataUnfiltered(searchContext.allResults);
      } else {
        setDataUnfiltered(dictionaryData);
      }
    }
  }, [searchContext?.allResults, dictionaryData]);

  return (
    <div>
      <MultiSwitch
        selected={selected}
        items={[
          { name: 'WORDS', icon: 'fv-words' },
          { name: 'PHRASES', icon: 'fv-quote-right' },
          { name: 'BOTH', icon: null },
        ]}
        onToggle={(index: number) => {
          setSelected(index);
        }}
      />
      <div
        id="wordList"
        className="overflow-y-auto max-h-calc-245 md:max-h-calc-195"
      >
        {dataToDisplay?.slice(0, visibleItems).map((item, _) => {
          const term = item.entry ? (item.entry as FvWord) : item;
          return (
            <div
              key={`${term.source}-${term.entryID}`}
              id={`${term.source}-${term.entryID}`}
              className="flex w-full"
            >
              <WordCardMobile item={item} />
              <WordCardDesktop item={item} wordWidthClass="w-80" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DictionaryView;
