import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Audio1, DictionaryEntryExportFormat } from '@mothertongues/search'

// FPCC
import { ALERT_TYPES } from 'constants/notification-types'
import { useDetectOnlineStatus } from 'util/useDetectOnlineStatus'
import ConfirmDialog from 'components/common/confirm/confirm'
import Modal from 'components/common/modal/modal'
import { FvCharacter, FvWord } from 'components/common/data'
import { useStartsWithChar } from 'util/useStartsWithChar'
import { useNotification } from 'components/contexts/notificationContext'
import IndexedDBService from 'services/indexedDbService'

export interface DownloadButtonProps {
  dictionaryData: DictionaryEntryExportFormat[]
  selected: FvCharacter
}

export function DownloadButton({ dictionaryData, selected }: Readonly<DownloadButtonProps>) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [downloadPercentage, setDownloadPercentage] = useState(0)
  const [showDownloadProgress, setShowDownloadProgress] = useState(false)
  const [currentlyDownloading, setCurrentlyDownloading] = useState(false)
  const { isOnline } = useDetectOnlineStatus()
  const { entriesStartingWith } = useStartsWithChar(dictionaryData, selected)
  const { setNotification } = useNotification()
  const [areAssetsCached, setAreAssetsCached] = useState(false)
  const [isCheckingCache, setIsCheckingCache] = useState(true)

  const checkCache = async () => {
    setIsCheckingCache(true)
    if (mediaArray.length === 0) {
      setAreAssetsCached(true)
      setIsCheckingCache(false)
    }

    const db = new IndexedDBService('firstVoicesIndexedDb')
    const result = await db.hasAllMediaFiles(mediaArray)

    setAreAssetsCached(result)
    setIsCheckingCache(false)
  }

  const getButtonLabel = () => {
    if (isCheckingCache) return 'Checking media...'
    if (mediaArray.length === 0) return 'No related media'
    if (areAssetsCached) return 'All media downloaded'
    return 'Download related media files'
  }

  const audioSet = useMemo(() => {
    const set = new Set<string>()
    entriesStartingWith.forEach((term: FvWord) => {
      // Get all of the audio files associated with the word/phrase.
      term.audio?.forEach((audio: Audio1) => set.add(audio.filename))
    })

    return set
  }, [entriesStartingWith])

  const imageSet = useMemo(() => {
    const set = new Set<string>()
    entriesStartingWith.forEach((term: FvWord) => {
      if (term.img) {
        set.add(term.img)
      }
    })

    return set
  }, [entriesStartingWith])

  const mediaSet = useMemo(() => new Set([...audioSet, ...imageSet]), [audioSet, imageSet])
  const mediaArray = useMemo(() => Array.from(mediaSet), [mediaSet])

  useEffect(() => {
    checkCache()
  }, [mediaArray])

  const buttonDisabled = mediaArray.length === 0 || isCheckingCache || areAssetsCached || currentlyDownloading

  return (
    <>
      <div className="flex justify-center items-center m-4">
        <button
          disabled={buttonDisabled}
          className={buttonDisabled ? 'btn-contained bg-gray-500' : 'btn-contained bg-primary-300 cursor-pointer'}
          onClick={() =>
            isOnline
              ? promptForDownload()
              : setNotification({
                  type: ALERT_TYPES.WARNING,
                  message: 'Content not downloaded.  Please try again when you have access to the internet.',
                })
          }
        >
          <p className="text-xl">
            {getButtonLabel()} <span className="fv-cloud-arrow-down-regular justify-self-end" />
          </p>
        </button>
      </div>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Do you want to download the audio and images for offline use?"
          message={
            <p className="space-y-2">
              This includes <span className="font-bold">{audioSet.size} audio files</span> and{' '}
              <span className="font-bold">{imageSet.size} images</span> related to the dictionary entries that begin
              with <span className="font-bold">&quot;{selected.title}&quot;</span>.
            </p>
          }
          confirmLabel="Download"
          cancelLabel="Cancel"
          onConfirm={() => downloadAssets(mediaSet)}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      {showDownloadProgress && (
        <Modal closeOnOutsideClick={false} onClose={() => setShowDownloadProgress(false)}>
          <div className="w-full text-center p-5 space-y-5">
            <div className="text-2xl">Download Progress</div>
            <div className="grid place-items-center">
              <div className="rounded-md bg-gray-300 w-full h-2 mx-5">
                <div
                  className="rounded-l-md bg-word-500 h-2"
                  style={{
                    width: `${downloadPercentage}%`,
                  }}
                />
              </div>
            </div>
            <div className="text-lg">{downloadPercentage}%</div>
          </div>
        </Modal>
      )}
    </>
  )

  async function promptForDownload() {
    if (currentlyDownloading) {
      setShowDownloadProgress(true)
    } else {
      setShowConfirmDialog(true)
    }
  }

  async function downloadAssets(mediaSet: Set<string>) {
    setDownloadPercentage(0)
    setCurrentlyDownloading(true)

    // If there is media to download get it and update the percentage.
    if (mediaSet.size > 0) {
      const promises: Promise<void>[] = []

      setShowDownloadProgress(true)
      let downloadComplete = 0

      mediaSet.forEach((media) => {
        promises.push(
          axios.get(media).then(() => {
            downloadComplete++
            setDownloadPercentage(Math.round((downloadComplete / mediaSet.size) * 100))
          })
        )
      })

      await Promise.all(promises)
      setCurrentlyDownloading(false)
      setShowDownloadProgress(false)
      checkCache()
    }
  }
}
