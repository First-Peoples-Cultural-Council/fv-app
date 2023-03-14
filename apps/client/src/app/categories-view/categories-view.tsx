import styles from './categories-view.module.css';

/* eslint-disable-next-line */
export interface CategoriesViewProps {}

export function CategoriesView(props: CategoriesViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CategoriesView!</h1>
    </div>
  );
}

export default CategoriesView;
