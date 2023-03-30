import styles from './learn-view.module.css';

/* eslint-disable-next-line */
export interface LearnViewProps {}

export function LearnView(props: LearnViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LearnView!</h1>
    </div>
  );
}

export default LearnView;
