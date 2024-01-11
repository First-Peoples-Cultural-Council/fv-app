import { useState, useEffect } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import { DictionaryType, FvWord } from '../common/data';
import MultiSwitch from '../common/multi-switch/multi-switch';
import { useOutletContext } from 'react-router-dom';
import fetchWordsData from '../../services/wordsApiService';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function DictionaryView(props: WordsViewProps) {
  const { setSearchMatchRef }: any = useOutletContext();
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [dataDict, setDataDict] = useState<FvWord[]>([]);
  const [data, setData] = useState<FvWord[]>([]);
  const [visibleItems, setVisibleItems] = useState(250);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData();
        setDataDict(result.data);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 20) {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 20);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setVisibleItems(250)
    switch (selected) {
      case DictionaryType.Words: {
        setData(dataDict.filter((entry) => entry.source === 'words'));
        break;
      }
      case DictionaryType.Phrases: {
        setData(dataDict.filter((entry) => entry.source === 'phrases'));
        break;
      }
      default: {
        setData(dataDict);
        break;
      }
    }
  }, [selected, dataDict]);

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
          setSelected(index);
        }}
      />
      {data.slice(0, visibleItems).map((term, _) => (
        <div
          key={`${term.source}-${term.entryID}`}
          id={`${term.source}-${term.entryID}`}
        >
          <WordCardMobile term={term} />
          <WordCardDesktop term={term} />
        </div>
      ))}{' '}
    </div>
  );
}

export default DictionaryView;
