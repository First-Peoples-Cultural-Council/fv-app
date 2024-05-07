import classNames from 'classnames';
import React, {
  useRef,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useParams, useOutletContext } from 'react-router-dom';
import WordAlphabetRowCard from './word-row-card';
import _ from 'lodash';
import { useIsMobile } from '../../util/useMediaQuery';
import {
  FvLetter,
  FvWordLocationCombo,
  isFvWord,
  isFvWordLocationCombo,
} from '../common/data';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import fetchWordsData from '../../services/wordsApiService';
import fetchCharactersData from '../../services/charactersApiService';
import axios from 'axios';
import ConfirmDialog from '../common/confirm/confirm';
import Modal from '../common/modal/modal';
import { Audio1, DictionaryEntryExportFormat } from '@mothertongues/search';
import styles from './alphabet-view.module.css';
import { SearchResultsContext } from '../search-results-provider';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import { Keyboard } from './keyboard';
import { SelectedLetterDisplay } from './selected-letter-display';
import { ApiContext } from '../contexts/apiContext';

/* eslint-disable-next-line */
export interface AlphabetViewProps {}

let dataAlphabetMap: Record<string, FvLetter>;

export function AlphabetView(this: any, props: AlphabetViewProps) {
  const wordListRef = useRef<HTMLDivElement | null>(null);

  const { setSearchMatchRef }: any = useOutletContext();
  const { letter } = useParams();
  const location = useLocation();
  const [dataDict, setDataDict] = useState<
    (DictionaryEntryExportFormat | FvWordLocationCombo)[]
  >([]);
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
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [showDownloadProgress, setShowDownloadProgress] = useState(false);
  const [currentlyDownloading, setCurrentlyDownloading] = useState(false);

  const [loading, setLoading] = useState(true);
  const searchResults = useContext(SearchResultsContext);
  const { isApiCallInProgress } = useContext(ApiContext);

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
        const result = await fetchWordsData(isApiCallInProgress);
        setDataDict(result.data);
      } catch (error) {
        // Handle error scenarios
        console.error('Error occurred:', error);
      }
      setLoading(false);
    };

    if (
      !searchResults?.rawSearchQuery ||
      searchResults?.rawSearchQuery.length <= 1
    ) {
      fetchDataAsync();
    } else {
      setDataDict(searchResults?.entries as DictionaryEntryExportFormat[]);
      setLoading(false);
    }
  }, [
    searchResults?.rawSearchQuery,
    searchResults?.entries,
    isApiCallInProgress,
  ]);

  useEffect(() => {
    if (showMobileWordList) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showMobileWordList]);

  return (
    <>
      <div className="flex md:hidden justify-center w-full">
        <div
          className={classNames(
            'overflow-y-auto col-span-1 w-full',
            styles['smallContainer']
          )}
        >
          <Keyboard
            selected={selected}
            setSelected={setSelected}
            dataAlphabet={dataAlphabet}
            exampleWordList={exampleWordList}
            note={note}
            setShowMobileWordList={setShowMobileWordList}
            wordListRef={wordListRef}
            promptForDownload={promptForDownload}
          />
        </div>
      </div>
      <div className="hidden md:block w-full">
        <div className="grid grid-cols-3">
          <div
            className={classNames(
              'overflow-y-auto col-span-1',
              styles['largeContainer']
            )}
          >
            <SelectedLetterDisplay
              selected={selected}
              setSelected={setSelected}
              setShowMobileWordList={setShowMobileWordList}
              promptForDownload={promptForDownload}
            />
            <Keyboard
              selected={selected}
              setSelected={setSelected}
              dataAlphabet={dataAlphabet}
              exampleWordList={exampleWordList}
              note={note}
              setShowMobileWordList={setShowMobileWordList}
              wordListRef={wordListRef}
              promptForDownload={promptForDownload}
            />
          </div>
          <div
            ref={wordListRef}
            className={classNames(
              'overflow-y-auto col-span-2',
              styles['largeContainer']
            )}
          >
            {selected?.relatedDictionaryEntries.length !== 0 &&
              exampleWordList()}
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

  function exampleWordList() {
    return (
      <div className="w-full">
        <div ref={setSearchMatchRef}></div>
        <div className="p-5">
          <span className="text-xl pr-2">EXAMPLE WORDS WITH</span>
          <span className="text-5xl bold">{selected?.title}</span>
        </div>
        {loading && <LoadingSpinner />}
        {!loading &&
          selected?.relatedDictionaryEntries.map((example) => {
            let term;
            term = dataDict.find((item) => {
              if (isFvWord(item)) {
                return item.entryID === example.id;
              }
              if (isFvWordLocationCombo(item)) {
                return item.entry.entryID === example.id;
              }
              return false;
            });
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
        {loading && <LoadingSpinner />}
        {!loading &&
          dataDict
            ?.filter((term) => {
              if (isFvWordLocationCombo(term)) {
                return term?.entry?.word?.startsWith(selected?.title ?? '');
              }
              return term?.word?.startsWith(selected?.title ?? '');
            })
            .sort((a, b) => {
              if (isFvWordLocationCombo(a) && isFvWordLocationCombo(b)) {
                return getAlphabetSort(a.entry.word, b.entry.word, 1);
              }
              if (isFvWord(a) && isFvWord(b)) {
                return getAlphabetSort(a.word, b.word, 1);
              }
              return 0;
            })
            .map((term) => {
              return (
                <Fragment
                  key={
                    isFvWordLocationCombo(term)
                      ? `${term.entry.source}-${term.entry.entryID}`
                      : `${term.source}-${term.entryID}`
                  }
                >
                  <WordAlphabetRowCard term={term} />
                </Fragment>
              );
            })}{' '}
      </div>
    );
  }

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
    dataDict
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

export default AlphabetView;
