import styles from './stories-view.module.css';

/* eslint-disable-next-line */
export interface StoriesViewProps {}

export function StoriesView(props: StoriesViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StoriesView!</h1>
    </div>
  );
}

export default StoriesView;
