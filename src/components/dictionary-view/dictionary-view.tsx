import { dataDict } from '../temp-word-list';
import { useState, useEffect } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import { DictionaryType } from '../common/data';
import MultiSwitch from '../common/multi-switch/multi-switch';
import { useOutletContext } from 'react-router-dom';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function DictionaryView(props: WordsViewProps) {
  const { setSearchMatchRef }: any = useOutletContext();
  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [data, setData] = useState(dataDict);

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
      {data.map((term) => {
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
  );
}

export default DictionaryView;
