import styles from './flashcards-view.module.css';

/* eslint-disable-next-line */
export interface FlashcardsViewProps {}

export function FlashcardsView(props: FlashcardsViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FlashcardsView!</h1>
    </div>
  );
}

export default FlashcardsView;
