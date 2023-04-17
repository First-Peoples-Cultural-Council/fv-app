import styles from './icon-label-button.module.css';

/* eslint-disable-next-line */
export interface IconLabelButtonProps {}

export function IconLabelButton(props: IconLabelButtonProps) {
  return (
    <div className={styles['container']}>
      <div className="flex items-center h-48 lg:h-60 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-tertiaryB group w-full rounded-lg bg-tertiaryB overflow-hidden"></div>
    </div>
  );
}

export default IconLabelButton;
