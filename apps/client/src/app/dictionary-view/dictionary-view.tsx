import styles from './dictionary-view.module.css';

/* eslint-disable-next-line */
export interface WordsViewProps {}

export function DictionaryView(props: WordsViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WordsView!</h1>
    </div>
  );
}

export default DictionaryView;
