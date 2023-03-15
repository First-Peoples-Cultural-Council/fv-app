import { dataDict } from '../temp-word-list';
import { Fragment } from 'react';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import WordCardDesktop from '../dictionary-page/word-card-desktop';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function DictionaryView(props: WordsViewProps) {
  return (
    <div>
      {dataDict.map((term) => {
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
