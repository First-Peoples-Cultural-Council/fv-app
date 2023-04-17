import styles from './songs-view.module.css';

/* eslint-disable-next-line */
export interface SongsViewProps {}

export function SongsView(props: SongsViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SongsView!</h1>
    </div>
  );
}

export default SongsView;
