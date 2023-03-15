import { dataDict } from '../temp-word-list';
import { Fragment, useState, useEffect } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import { DictionaryType, MultiSwitch } from '@fv-app/common-components';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function DictionaryView(props: WordsViewProps) {
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
          <Fragment key={`${term.source}-${term.entryID}`}>
            <WordCardMobile
              word={term.word}
              definition={term.definition}
              audio={term.audio}
              img={term.img}
              source={term.source}
              entryID={term.entryID}
              theme={term.theme}
              secondary_theme={term.secondary_theme}
              optional={term.optional}
              compare_form={term.compare_form}
              sort_form={term.sort_form}
              sorting_form={term.sorting_form}
            />
            <WordCardDesktop
              word={term.word}
              definition={term.definition}
              audio={term.audio}
              img={term.img}
              source={term.source}
              entryID={term.entryID}
              theme={term.theme}
              secondary_theme={term.secondary_theme}
              optional={term.optional}
              compare_form={term.compare_form}
              sort_form={term.sort_form}
              sorting_form={term.sorting_form}
            />
          </Fragment>
        );
      })}{' '}
    </div>
  );
}

export default DictionaryView;
