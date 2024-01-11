import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import WordAlphabetRowCard from './word-row-card';
import _ from 'lodash';
import { useIsMobile } from '../../util/useMediaQuery';
import { FVMedia, FvLetter, FvWord } from '../common/data';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { useButtonStyle } from '../common/hooks';
import fetchWordsData from '../../services/wordsApiService';
import fetchCharactersData from '../../services/charactersApiService';
import axios from 'axios';
import ConfirmDialog from '../common/confirm/confirm';
import Modal from '../common/modal/modal';
import { useDetectOnlineStatus } from '../common/hooks/useDetectOnlineStatus';
import Alert from '../common/alert/alert';
import { Audio1 } from '@mothertongues/search';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

let dataAlphabetMap: Record<string, FvLetter>;

export function AlphabetView(props: AlphabetViewProps) {
  const { letter } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dataDict, setDataDict] = useState<FvWord[]>([]);
  const [dataAlphabet, setDataAlphabet] = useState<FvLetter[]>([]);
  const [selected, setSelected] = useState<FvLetter | null>(
    (dataAlphabet.find(
      (letterData) => letterData.title === decodeURIComponent(letter ?? '')
    ) as FvLetter) ?? null
  );
  const [showMobileWordList, setShowMobileWordList] = useState(
    location.hash &&
      !location.hash.startsWith('#') &&
      !window.matchMedia('(min-width: 768px').matches
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [downloadPercentage, setDownloadedPercentage] = useState(0);
  const [showDownloadProgress, setShowDownloadProgress] = useState(false);
  const [currentlyDownloading, setCurrentlyDownloading] = useState(false);
  const [showAlertNotOnline, setShowAlertNotOnline] = useState(false);
  const { isOnline } = useDetectOnlineStatus();
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  if (!useIsMobile() && selected === null && dataAlphabet.length !== 0) {
    setSelected(dataAlphabet[0]);
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchCharactersData();
        _.keyBy(result, 'title');
        setDataAlphabet(result);
      } catch (error) {
        // Handle error scenarios
      }
      try {
        const result = await fetchWordsData();
        setDataDict(result.data);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (showMobileWordList) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showMobileWordList]);

  return (
    <>
      <div className="block md:hidden flex justify-center w-full">
        {keyboard()}
      </div>
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-3">
          <div className='col-span-1'>
            {selectedLetterDisplay()}
            {keyboard()}
          </div>
          <div className='col-span-2'>
            {selected?.relatedDictionaryEntries.length !== 0 && exampleWordList()}
            {selected?.note !== undefined && note()}
            {wordList()}
          </div>
        </div>
      </div>
      {showMobileWordList && (
        <FullScreenModal
          onClose={() => setShowMobileWordList(false)}
          actions={<></>}
        >
          {wordList()}
        </FullScreenModal>
      )}
      {showConfirmDialog && (
        <ConfirmDialog
          title="Confirm Download"
          message="You are about to download all the media files for this letter."
          confirmLabel="Continue"
          cancelLabel="No, Thanks"
          onConfirm={() => downloadAssets()}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
      {showDownloadProgress && (
        <Modal
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

  function selectedLetterDisplay() {
    const audioCount = selected?.relatedAudio.length ?? 0;

    return (
      <>
        <button
          className="fv-close float-right block md:hidden"
          onClick={() => {
            setSelected(null);
            setShowMobileWordList(false);
            navigate('/alphabet');
          }}
        />
        <div className="flex text-8xl justify-center pb-6">
          {selected?.title}
        </div>
        {audioCount === 0 && (
          <div className="flex w-full justify-center">
            {copyButton()}
            {downloadButton()}
          </div>
        )}
        {audioCount === 1 && (
          <div className="grid grid-cols-3">
            {copyButton()}
            {downloadButton()}
            {selected?.relatedAudio.map((fvAudio) => {
              return audioButton(fvAudio);
            })}
          </div>
        )}
        {audioCount > 1 && (
          <>
            <div className="flex w-full justify-center">{copyButton()}</div>
            <div className="flex w-full justify-center">{downloadButton()}</div>
            <div className="flex justify-evenly mt-5">
              {selected?.relatedAudio.map((fvAudio) => {
                return audioButton(fvAudio);
              })}
            </div>
          </>
        )}
      </>
    );
  }

  function copyButton() {
    return (
      <div className="flex justify-center items-center">
        <span
          className="fv-copy text-4xl cursor-pointer"
          onClick={() => {
            navigator.clipboard
              .writeText(selected?.title ?? '')
              .catch((err: any) => {
                console.log(err);
              });
          }}
        />
      </div>
    );
  }

  function downloadButton() {
    return (
      <div className="flex justify-center items-center">
        <span
          className="fv-cloud-arrow-down-regular text-4xl justify-self-end cursor-pointer"
          onClick={() =>
            isOnline ? promptForDownload() : setShowAlertNotOnline(true)
          }
        />
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
    );
  }

  function audioButton(fvAudio: FVMedia) {
    return (
      <div key={fvAudio.url} className="flex justify-center items-center">
        <span
          className="fv-volume-up text-4xl justify-self-end cursor-pointer"
          onClick={() => playAudio(fvAudio.url)}
        />
      </div>
    );
  }

  function keyboard() {
    const alphabetRows: FvLetter[][] = _.chunk(dataAlphabet, 4);

    return (
      <div className="mt-5 mb-5 p-10 md:p-2 w-full">
        {alphabetRows.map((row) => {
          let showLetterDisplay = false;
          return (
            <Fragment
              key={`row-${row.map((letterData) => {
                return letterData.title;
              })}`}
            >
              <div className="grid gap-4 md:gap-2 grid-cols-4 pb-4">
                {row.map((letterData) => {
                  if (letterData === selected) {
                    showLetterDisplay = true;
                  }
                  return (
                    <button
                      key={letterData.title}
                      id={`letter-${letterData.title}`}
                      className={classNames(
                        'border col-span-1 font-medium inline-flex justify-center p-5 md:p-3 rounded shadow text-2xl',
                        {
                          'bg-cyan-900 text-white hover:bg-cyan-700':
                            letterData === selected,
                          'hover:bg-gray-200': letterData !== selected,
                        }
                      )}
                      onClick={() => {
                        setSelected(letterData);
                        setShowMobileWordList(false);
                      }}
                    >
                      {letterData.title}
                    </button>
                  );
                })}
              </div>
              {showLetterDisplay && (
                <div className="md:hidden">
                  <div className="pb-10 pt-10">{selectedLetterDisplay()}</div>

                  {selected?.relatedDictionaryEntries.length !== 0 && exampleWordList()}
                  {selected?.note !== undefined && note()}

                  <div className="w-full flex justify-center pb-8">
                    <button
                      className={tertiaryButtonStyle}
                      onClick={() => setShowMobileWordList(true)}
                    >
                      <span className="pr-2">See all words starting with</span>
                      <span className="text-2xl font-bold">
                        {selected?.title}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }

  function exampleWordList() {
    return (
      <div className="w-full">
        <div className="p-5">
          <span className="text-xl pr-2">EXAMPLE WORDS WITH</span>
          <span className="text-5xl bold">{selected?.title}</span>
        </div>
        {selected?.relatedDictionaryEntries.map((example) => {
          const term = dataDict?.find((word) => word.entryID === example.id);
          if (term === undefined) {
            return null;
}
          return (
            <div
              key={`${example.type}-${example.id}-example`}
              id={`${example.type}-${example.id}`}
            >
              <WordAlphabetRowCard term={term} />
            </div>
          );
        })}
      </div>
    );
  }

  function note() {
    return (
      <div className="p-5">
        <div className="text-xl pb-2">NOTES</div>
        <div>{selected?.note}</div>
      </div>
    );
  }

  function getAlphabetSort(a: string, b: string, letterIndex: number): number {
    const aOrder = dataAlphabetMap?.[a[letterIndex]]?.sortOrder;
    const bOrder = dataAlphabetMap?.[b[letterIndex]]?.sortOrder;
    if (aOrder === undefined) {
      return 1;
    } else if (bOrder === undefined) {
      return -1;
    } else if (aOrder === bOrder) {
      return getAlphabetSort(a, b, letterIndex + 1);
    } else {
      return aOrder - bOrder;
    }
  }

  function wordList() {
    return (
      <div className="w-full">
        <div className="p-5">
          <span className="text-xl pr-2">WORDS STARTING WITH</span>
          <span className="text-5xl bold">{selected?.title}</span>
        </div>
        {dataDict
          ?.filter((term) => {
            return term.word.startsWith(selected?.title ?? '');
          })
          .sort((a, b) => {
            return getAlphabetSort(a.word, b.word, 1);
          })
          .map((term) => {
            return (
              <Fragment key={`${term.source}-${term.entryID}`}>
                <WordAlphabetRowCard term={term} />
              </Fragment>
            );
          })}{' '}
      </div>
    );
  }

  async function playAudio(fileName: string) {
    const audio = new Audio(fileName);
    audio.play().catch((err: any) => {
      console.log(err);
    });
  }

  async function promptForDownload() {
    if (currentlyDownloading) {
      setShowDownloadProgress(true);
    } else {
      setShowConfirmDialog(true);
    }
  }

  async function downloadAssets() {
    setDownloadedPercentage(0);
    setCurrentlyDownloading(true);

    const mediaList: Set<string> = new Set();

    // Get a list of the assets associated with the words/phrases
    // that start with the selected letter.
    dataDict
      .filter((term) => {
        return term.word.startsWith(selected?.title ?? '');
      })
      .forEach((term) => {
        // Get the image associated with the word/phrase.
        if (term.img) {
          mediaList.add(term.img);
        }
        // Get all of the audio files associated with the word/phrase.
        term.audio?.forEach((audio: Audio1) => {
          mediaList.add(audio.filename);
        });
      });

    // If there is media to download get it and update the percentage.
    if (mediaList.size > 0) {
      const promises: Promise<void>[] = [];

      setShowDownloadProgress(true);
      let downloadComplete = 0;

      mediaList.forEach((media) => {
        const promise = new Promise<void>((resolve) => {
          axios
            .get(media)
            .then(() => {
              downloadComplete++;
              setDownloadedPercentage(
                Math.round((downloadComplete / mediaList.size) * 100)
              );
              resolve();
            })
            .catch((error) => {
              // Handle error
              console.error('Error occurred:', error);
              resolve();
            });
        });

        promises.push(promise);
      });

      await Promise.all(promises);
      setCurrentlyDownloading(false);
      setShowDownloadProgress(false);
    }
  }
}

export default AlphabetView;
