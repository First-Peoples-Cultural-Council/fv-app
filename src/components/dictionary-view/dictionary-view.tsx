import { useState, useEffect, useContext, useMemo } from 'react';

// FPCC
import WordCardMobile from './word-card-mobile';
import WordCardDesktop from './word-card-desktop';
import {
  DictionaryType,
  FvWord,
  FvWordLocationCombo,
  isFvWordLocationCombo,
} from '../common/data';
import MultiSwitch from '../common/multi-switch/multi-switch';
import { useDictionaryData } from '../dictionary-page/dictionary-page';
import { SearchContext } from '../contexts/searchContext';

/* eslint-disable-next-line */
export interface DictionaryViewProps {}

export function DictionaryView(props: DictionaryViewProps) {
  const { dictionaryData } = useDictionaryData();
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [dataUnfiltered, setDataUnfiltered] = useState<any>(dictionaryData);
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

  const isEntryOfType = (entry: FvWord | FvWordLocationCombo, type: string) => {
    const entryType = isFvWordLocationCombo(entry)
      ? entry.entry.source
      : entry.source;
    return entryType === type;
  };

  // Filter data to display by selected TYPE
  const dataToDisplay: FvWord[] = useMemo(() => {
    switch (selected) {
      case DictionaryType.Words: {
        return [
          ...dataUnfiltered.filter((entry: FvWord | FvWordLocationCombo) =>
            isEntryOfType(entry, 'words')
          ),
        ];
      }
      case DictionaryType.Phrases: {
        return [
          ...dataUnfiltered.filter((entry: FvWord | FvWordLocationCombo) =>
            isEntryOfType(entry, 'phrases')
          ),
        ];
      }
      default: {
        return [...dataUnfiltered];
      }
    }
  }, [selected, dataUnfiltered]);

  const onTypeToggle = (typeNumber: number) => {
    setVisibleItems(250);
    const container = document.getElementById('wordList');
    if (container) {
      container.scrollTop = 0;
    }
    setSelected(typeNumber);
  };

  // Checking for searchResults
  useEffect(() => {
    if (!searchContext?.searchResults) {
      setDataUnfiltered(dictionaryData);
    } else if (searchContext.searchResults) {
      setDataUnfiltered(searchContext.searchResults);
    }
  }, [searchContext?.searchResults, dictionaryData]);

  return (
    <div className="w-full">
      <MultiSwitch
        selected={selected}
        items={[
          { name: 'WORDS', icon: 'fv-words' },
          { name: 'PHRASES', icon: 'fv-quote-right' },
          { name: 'BOTH', icon: null },
        ]}
        onToggle={(index: number) => {
          onTypeToggle(index);
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
        {dataToDisplay?.length === 0 && (
          <div className="w-full text-center py-5 max-w-md mx-auto">
            There are no matching results for your search. Please try a
            different search.
          </div>
        )}
      </div>
    </div>
  );
}

export default DictionaryView;
