import React, { useState } from 'react';
import axios from 'axios';
import { Audio1, DictionaryEntryExportFormat } from '@mothertongues/search';

// FPCC
import Alert from '../common/alert/alert';
import { useDetectOnlineStatus } from '../common/hooks/useDetectOnlineStatus';
import ConfirmDialog from '../common/confirm/confirm';
import Modal from '../common/modal/modal';
import {
  FvLetter,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';

export interface DownloadButtonProps {
  dataDictionary: (DictionaryEntryExportFormat | FvWordLocationCombo)[];
  selected: FvLetter;
}

export function DownloadButton({
  dataDictionary,
  selected,
}: Readonly<DownloadButtonProps>) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [showDownloadProgress, setShowDownloadProgress] = useState(false);
  const [currentlyDownloading, setCurrentlyDownloading] = useState(false);
  const { isOnline } = useDetectOnlineStatus();
  const [showAlertNotOnline, setShowAlertNotOnline] = useState(false);
  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={() =>
            isOnline ? promptForDownload() : setShowAlertNotOnline(true)
          }
        >
          <span className="fv-cloud-arrow-down-regular text-4xl justify-self-end cursor-pointer" />
        </button>
        <Alert
          type={'warning'}
          message="Content not downloaded.  Please try again when you have access to the internet."
          showDismissButton={true}
          showAlert={showAlertNotOnline}
          dismissAlert={function (): void {
            setShowAlertNotOnline(false);
          }}
        />
      </div>
      {showConfirmDialog && (
        <ConfirmDialog
          title="Confirm Download"
          message={`You are about to download all the media files for dictionary entries beginning with ${selected.title}.`}
          confirmLabel="Continue"
          cancelLabel="No, Thanks"
          onConfirm={() => downloadAssets()}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      {showDownloadProgress && (
        <Modal closeOnOutsideClick={false}
          title="Download Progress"
          onClose={() => setShowDownloadProgress(false)}
        >
          <div className="grid place-items-center">
            <div className={`rounded-md bg-gray-300 w-[400px] h-2 ml-10 mr-10`}>
              <div
                className={`rounded-l-md bg-green-500 h-2`}
                style={{
                  width: `${downloadPercentage}%`,
                }}
              />
            </div>
            <div className="text-xl p-2">{downloadPercentage}%</div>
          </div>
        </Modal>
      )}
    </>
  );

  async function promptForDownload() {
    if (currentlyDownloading) {
      setShowDownloadProgress(true);
    } else {
      setShowConfirmDialog(true);
    }
  }

  async function downloadAssets() {
    setDownloadPercentage(0);
    setCurrentlyDownloading(true);

    const mediaList: Set<string> = new Set();

    // Get a list of the assets associated with the words/phrases
    // that start with the selected letter.
    dataDictionary
      .filter((term) => {
        if (isFvWord(term)) {
          return term.word.startsWith(selected?.title ?? '');
        }
        if (isFvWordLocationCombo(term)) {
          return term.entry.word.startsWith(selected?.title ?? '');
        }
        return false;
      })
      .forEach((term) => {
        if (isFvWord(term)) {
          // Get the image associated with the word/phrase.
          if (term.img) {
            mediaList.add(term.img);
          }
          // Get all of the audio files associated with the word/phrase.
          term.audio?.forEach((audio: Audio1) => {
            mediaList.add(audio.filename);
          });
        }
        if (isFvWordLocationCombo(term)) {
          // Get the image associated with the word/phrase.
          if (term.entry.img) {
            mediaList.add(term.entry.img);
          }
          // Get all of the audio files associated with the word/phrase.
          term.entry.audio?.forEach((audio: Audio1) => {
            mediaList.add(audio.filename);
          });
        }
      });

    // If there is media to download get it and update the percentage.
    if (mediaList.size > 0) {
      const promises: Promise<void>[] = [];

      setShowDownloadProgress(true);
      let downloadComplete = 0;

      mediaList.forEach((media) => {
        promises.push(
          axios.get(media).then(() => {
            downloadComplete++;
            setDownloadPercentage(
              Math.round((downloadComplete / mediaList.size) * 100)
            );
          })
        );
      });

      await Promise.all(promises);
      setCurrentlyDownloading(false);
      setShowDownloadProgress(false);
    }
  }
}
