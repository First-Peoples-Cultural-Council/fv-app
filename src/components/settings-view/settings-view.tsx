import styles from './settings-view.module.css';
import IndexedDBService from '../../services/indexedDbService';
import { useEffect, useState } from 'react';
import ConfirmDialog from '../common/confirm/confirm';

/* eslint-disable-next-line */
export interface SettingsViewProps {}

export function SettingsView(props: SettingsViewProps) {

  const [db, setDb] = useState<IndexedDBService>();
  const [mediaCount, setMediaCount] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));
  }, []);

  useEffect(() => {
    if(db){
      updateMediaCount();
    }
  }, [db]);

  return (
    <>
      <div className={styles['container']}>
        <div className="m-4">
          <p className="mb-3">Media files are stored in a local cache, so they are available when you are offline. You can clear this cache to free up space on your device, but the files will stop being available offline until you download them again.</p>
          <p className="mb-6">Currently you have <span id="localMediaCount">{mediaCount}</span> files in your local cache.</p>

          <p><button
            className="btn-contained bg-secondary"
            onClick={() => setShowConfirmDialog(true)}
          >
            Clear Media Cache
            {/* <i className=""></i> */}
          </button></p>
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

  async function updateMediaCount() {
    const count = await db?.getMediaCount();
    setMediaCount(count || 0);
  }

  function handleClearCache() {
    db?.clearMediaFilesCollection();
    updateMediaCount();
  }
}

export default SettingsView;
