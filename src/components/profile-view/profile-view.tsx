import styles from './profile-view.module.css';

/* eslint-disable-next-line */
export interface ProfileViewProps {}

export function ProfileView(props: ProfileViewProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProfileView!</h1>
    </div>
  );
}

export default ProfileView;
