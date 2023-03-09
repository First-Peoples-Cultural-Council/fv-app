import { dataDict } from '../temp-word-list';
import styles from './dictionary.module.css';
import WordCardDesktop from './word-card-desktop';
import WordCardMobile from './word-card-mobile';

/* eslint-disable-next-line */
export interface DictionaryProps {}

export function Dictionary(props: DictionaryProps) {
  return (
    <div className={styles['container']}>
      {dataDict.map((term) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
}

export default Dictionary;
