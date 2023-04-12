import styles from './settings-view.module.css';

/* eslint-disable-next-line */
export interface SettingsViewProps {}

export function SettingsView(props: SettingsViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SettingsView!</h1>
    </div>
  );
}

export default SettingsView;
