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
      <div>
        <div className="m-4">
          <p className="mb-3">
            We store media files to assist with app performance. You can clear this cache to free up space on your
            device.
          </p>
          <p className="mb-6">
            Currently you have <span id="localMediaCount">{mediaCount}</span> files in your local cache.
          </p>

          <p>
            <button className="btn-contained bg-secondary-500" onClick={() => setShowConfirmDialog(true)}>
              Clear Media Cache
            </button>
          </p>
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
