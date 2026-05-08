import { useEffect, useState } from 'react'

// FPCC
import IndexedDBService from 'services/indexedDbService'
import ConfirmDialog from 'components/common/confirm/confirm'

export function SettingsView() {
  const [db, setDb] = useState<IndexedDBService>()
  const [mediaCount, setMediaCount] = useState(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'))
  }, [])

  useEffect(() => {
    if (db) {
      updateMediaCount()
    }
  }, [db])

  return (
    <>
      <div className="m-4 space-y-6">
        <h1 className="text-2xl text-primary-500">Settings</h1>
        <div className="space-y-2">
          <p>
            We store media files to assist with app performance. You can clear this cache to free up space on your
            device.
          </p>
          <p>
            Currently you have <span id="localMediaCount">{mediaCount}</span> files in your local cache.
          </p>
        </div>

        <button className="btn-contained bg-primary-300" onClick={() => setShowConfirmDialog(true)}>
          Clear Media Cache
        </button>
      </div>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Clear offline media cache"
          message="Are you sure you want to remove all the media files that have been downloaded to your device?"
          confirmLabel="Clear"
          cancelLabel="Cancel"
          onConfirm={() => handleClearCache()}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  )

  async function updateMediaCount() {
    const count = await db?.getMediaCount()
    setMediaCount(count || 0)
  }

  function handleClearCache() {
    db?.clearMediaFilesCollection()
    updateMediaCount()
  }
}

export default SettingsView
