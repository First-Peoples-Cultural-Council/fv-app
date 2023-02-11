import styles from './choose-alanguage.module.css';

/* eslint-disable-next-line */
export interface ChooseALanguageProps {}

export function ChooseALanguage(props: ChooseALanguageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ChooseALanguage!</h1>
    </div>
  );
}

export default ChooseALanguage;
