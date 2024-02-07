import { useState, useEffect } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import { DictionaryType } from '../common/data/enums';
import MultiSwitch from '../common/multi-switch/multi-switch';
import { FvWord } from '../common/data';
import fetchWordsData from '../../services/wordsApiService';
import generateUniqueRandomItems from '../../util/randomSet';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function RandomizedView(props: WordsViewProps) {
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [dataDict, setDataDict] = useState<FvWord[]>([]);
  const [data, setData] = useState<FvWord[]>([]);
  const [subset, setSubset] = useState<FvWord[]>([]);
  const [loading, setLoading] = useState(true);

  const resetScroll = () => {
    const container = document.getElementById('wordList');
    if (container) {
      container.scrollTop = 0;
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData();
        setDataDict(result.data);
        setLoading(false);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    setSubset(generateUniqueRandomItems(data, 10));
  }, [data]);

  return (
    <div className="w-full">
      {loading && <LoadingSpinner />}
      <div className="flex flex-row flex-wrap">
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
        <button
          onClick={() => {
            setSubset(generateUniqueRandomItems(data, 10));
          }}
          className="ml-4"
        >
          <i className="fv-arrows-cw text-lg" />
        </button>
      </div>
      <div
        id="wordList"
        className="overflow-y-auto max-h-calc-245 md:max-h-calc-195"
      >
        {subset.map((term) => {
          return (
            <div
              key={`${term.source}-${term.entryID}`}
              id={`${term.source}-${term.entryID}`}
            >
              <WordCardMobile term={term} />
              <WordCardDesktop term={term} />
            </div>
          );
        })}{' '}
      </div>
    </div>
  );
}

export default RandomizedView;
