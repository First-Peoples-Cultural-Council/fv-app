import { dataDict } from '../temp-word-list';
import { useState, useEffect } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import { DictionaryType } from '../common/data/enums';
import MultiSwitch from '../common/multi-switch/multi-switch';
import pickRandomItems from '../../util/randomSet';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function RandomizedView(props: WordsViewProps) {
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [data, setData] = useState(dataDict);
  const [subset, setSubset] = useState(pickRandomItems(data, 10));

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
  }, [selected]);

  return (
    <div>
      <div className="flex flex-row">
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
        <button
          onClick={()=>{
            setSubset(pickRandomItems(data, 10));
          }}
          className="py-2 px-4 text-center"
        >
          <i className="fv-arrows-cw" />
        </button>
      </div>
      {subset.map((term) => {
        return (
          <div key={`${term.source}-${term.entryID}`} id={`${term.source}-${term.entryID}`}>
            <WordCardMobile term={term} />
            <WordCardDesktop term={term} />
          </div>
        );
      })}{' '}
    </div>
  );
}

export default RandomizedView;
