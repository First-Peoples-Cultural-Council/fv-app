import styles from './phrases-view.module.css';

/* eslint-disable-next-line */
export interface PhrasesViewProps {}

export function PhrasesView(props: PhrasesViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PhrasesView!</h1>
    </div>
  );
}

export default PhrasesView;
