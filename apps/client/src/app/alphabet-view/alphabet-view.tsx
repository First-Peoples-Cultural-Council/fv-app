import styles from '../dictionary-view/dictionary-view.module.css';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

export function AlphabetView(props: AlphabetViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AlphabetView!</h1>
    </div>
  );
}

export default AlphabetView;
