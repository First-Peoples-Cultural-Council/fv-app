import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Audio1, DictionaryEntryExportFormat } from '@mothertongues/search'
import { FaCircleCheck, FaCloudArrowDown, FaRegImage, FaSpinner } from 'react-icons/fa6'

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

  const getStatus = () => {
    if (isCheckingCache) {
      return {
        label: 'Checking media...',
        icon: FaSpinner,
      }
    }

    if (mediaArray.length === 0) {
      return {
        label: 'No related media',
        icon: FaRegImage,
      }
    }

    if (areAssetsCached) {
      return {
        label: 'All media downloaded',
        icon: FaCircleCheck,
      }
    }

    return null
  }

  const status = getStatus()
  const showDownloadButton = !status

  return (
    <>
      <div className="flex justify-center items-center m-4">
        {showDownloadButton ? (
          <button
            className="bg-primary-300 btn-contained w-full max-w-xs transition-colors duration-300 cursor-pointer"
            onClick={() =>
              isOnline
                ? promptForDownload()
                : setNotification({
                    type: ALERT_TYPES.WARNING,
                    message: 'Content not downloaded. Please try again when you have access to the internet.',
                  })
            }
          >
            <div className="flex items-center justify-center gap-2">
              <span>Download related media files</span>
              <FaCloudArrowDown className="text-2xl" />
            </div>
          </button>
        ) : (
          <div className={`flex items-center justify-center gap-2 w-full max-w-xs py-2 font-medium`}>
            <span>{status.label}</span>
            <status.icon />
          </div>
        )}
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
      setShowDownloadProgress(true)

      const files = Array.from(mediaSet)
      const concurrency = 25
      let downloadComplete = 0

      for (let i = 0; i < files.length; i += concurrency) {
        const batch = files.slice(i, i + concurrency)

        await Promise.all(
          batch.map(async (media) => {
            await axios.get(media)

            downloadComplete++

            setDownloadPercentage(Math.round((downloadComplete / mediaSet.size) * 100))
          })
        )
      }
      setCurrentlyDownloading(false)
      setShowDownloadProgress(false)
      checkCache()
    }
  }
}
