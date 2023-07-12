import { useButtonStyle } from '../common/hooks';
import styles from './settings-view.module.css';
import IndexedDBService from '../../services/indexedDbService';
import { useEffect, useState } from 'react';
import ConfirmDialog from '../common/confirm/confirm';

/* eslint-disable-next-line */
export interface SettingsViewProps {}

export function SettingsView(props: SettingsViewProps) {
  const primaryButtonStyle = useButtonStyle('primary', 'button');

  const [db, setDb] = useState<IndexedDBService>();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  return (
    <>
      <div className={styles['container']}>
        <div className="m-4">
          <button
            className={primaryButtonStyle}
            onClick={() => setShowConfirmDialog(true)}
          >
            Clear Media Cache
            {/* <i className=""></i> */}
          </button>
        </div>
      </div>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Confirm Clear"
          message="You are about to clear out all the media files that have been downloaded."
          onConfirm={() => handleClearCache()}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );

  function handleClearCache() {
    db?.clearMediaFilesCollection();
  }
}

export default SettingsView;
