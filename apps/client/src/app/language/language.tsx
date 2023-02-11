import styles from './language.module.css';

/* eslint-disable-next-line */
export interface LanguageProps {}

export function Language(props: LanguageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Language!</h1>
    </div>
  );
}

export default Language;
