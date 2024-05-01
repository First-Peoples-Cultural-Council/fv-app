import { useState, useEffect, useContext } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import { DictionaryType, FvWord, isFvWordLocationCombo } from '../common/data';
import MultiSwitch from '../common/multi-switch/multi-switch';
import { useOutletContext } from 'react-router-dom';
import fetchWordsData from '../../services/wordsApiService';
import { SearchContext } from '../search-provider';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import { ApiContext } from '../contexts/apiContext';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function DictionaryView(props: WordsViewProps) {
  const { setSearchMatchRef }: any = useOutletContext();
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [dataDict, setDataDict] = useState<FvWord[]>([]);
  const [data, setData] = useState<FvWord[]>([]);
  const [visibleItems, setVisibleItems] = useState(250);
  const [loading, setLoading] = useState(true);

  const searchContext = useContext(SearchContext);
  const { isApiCallInProgress } = useContext(ApiContext);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData(isApiCallInProgress);
        setDataDict(result.data);
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, [isApiCallInProgress]);

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

  const resetScroll = () => {
    const container = document.getElementById('wordList');
    if (container) {
      container.scrollTop = 0;
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

  useEffect(() => {
    setVisibleItems(250);
    switch (selected) {
      case DictionaryType.Words: {
        setData(
          dataDict.filter(
            (entry) =>
              (isFvWordLocationCombo(entry)
                ? entry.entry.source
                : entry.source) === 'words'
          )
        );
        break;
      }
      case DictionaryType.Phrases: {
        setData(
          dataDict.filter(
            (entry) =>
              (isFvWordLocationCombo(entry)
                ? entry.entry.source
                : entry.source) === 'phrases'
          )
        );
        break;
      }
      default: {
        setData(dataDict);
        break;
      }
    }
  }, [selected, dataDict]);

  useEffect(() => {
    if (searchContext?.allResults && searchContext.allResults.length > 0) {
      setDataDict(searchContext.allResults);
    }
  }, [searchContext?.allResults]);

  return (
    <div>
      <div ref={setSearchMatchRef}></div>
      <MultiSwitch
        selected={selected}
        items={[
          { name: 'WORDS', icon: 'fv-words' },
          { name: 'PHRASES', icon: 'fv-quote-right' },
          { name: 'BOTH', icon: null },
        ]}
        onToggle={(index: number) => {
          resetScroll();
          setSelected(index);
        }}
      />
      <div
        id="wordList"
        className="overflow-y-auto max-h-calc-245 md:max-h-calc-195"
      >
        {loading && <LoadingSpinner />}
        {!loading &&
          data?.slice(0, visibleItems).map((item, _) => {
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
          })}{' '}
      </div>
    </div>
  );
}

export default DictionaryView;
