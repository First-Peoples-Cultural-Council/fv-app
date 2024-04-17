import classNames from 'classnames';
import { useButtonStyle } from '../common/hooks';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../util/clickOutside';
import {
  Bookmark,
  Flashcard,
  FvAudio,
  FvCategory,
  FvWord,
} from '../common/data';
import shuffle from '../../util/shuffle';
import fetchCategoryData from '../../services/categoriesApiService';
import fetchWordsData from '../../services/wordsApiService';
import IndexedDBService from '../../services/indexedDbService';

/* eslint-disable-next-line */
export interface FlashcardsViewProps {}

export function FlashcardsView(props: FlashcardsViewProps) {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [showDonePromptModal, setShowDonePromptModal] = useState(false);

  const [selectedFlashcardType, setSelectedFlashcardType] = useState<string>();
  const [selectedFlashcardDisplayType, setSelectedFlashcardDisplayType] =
    useState('');
  const [flipped, setFlipped] = useState(false);
  const [db, setDb] = useState<IndexedDBService>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [dictionaryData, setDataDict] = useState<FvWord[]>([]);
  const [data, setData] = useState<FvWord[]>([]);
  const [dataForFlashcardGroup, setDataForFlashcardGroup] = useState<any>();
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [flashcardData, setFlashcardData] = useState<Flashcard>();
  const [dataCategories, setDataCategories] = useState<any>([]);

  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  const SelectModalRef = useRef<HTMLDivElement>(null);
  const CategoryModalRef = useRef<HTMLDivElement>(null);

  const flashcardsBatchSize = 25;

  useEffect(() => {
    fetchCategoryData().then((result) => {
      setDataCategories(result);
    });
  }, []);

  useOnClickOutside(SelectModalRef, () => {
    setShowSelectModal(false);
  });
  useOnClickOutside(CategoryModalRef, () => {
    setShowCategoryModal(false);
  });

  useEffect(() => {
    setDb(new IndexedDBService('firstVoicesIndexedDb'));

    const fetchDataAsync = async () => {
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
    const usersBookmarks = async () => {
      if (db) {
        await setUsersBookmarks();
      }
    };
    usersBookmarks().catch((err) => {
      console.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  useEffect(() => {
    if (dataForFlashcardGroup) {
      if (selectedFlashcardDisplayType === '') {
        setShowSelectModal(true);
      } else {
        setDataForFlashcard(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataForFlashcardGroup]);

  useEffect(() => {
    if (selectedFlashcardDisplayType !== '') {
      setShowSelectModal(false);
      setDataForFlashcard(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlashcardDisplayType]);

  useEffect(() => {
    if (flashcardData) {
      setShowFlashcardModal(true);
    }
  }, [flashcardData]);

  async function setUsersBookmarks() {
    setBookmarks((await db?.getBookmarks()) ?? []);
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          {flashCardType('Words', 'fv-wordsfc', () => {
            setSelectedFlashcardDisplayType('');
            saveDataForFlashcards(
              dictionaryData.filter((entry) => entry.source === 'words')
            );
          })}
          {flashCardType('Phrases', 'fv-phrasesfc', () => {
            setSelectedFlashcardDisplayType('');
            saveDataForFlashcards(
              dictionaryData.filter((entry) => entry.source === 'phrases')
            );
          })}
          {flashCardType('Category', 'fv-categories', () => {
            setSelectedFlashcardDisplayType('');
            setShowCategoryModal(true);
          })}
          {flashCardType('Bookmarks', 'fv-bookmark', () => {
            setSelectedFlashcardDisplayType('');
            saveDataForFlashcards(
              dictionaryData.filter((entry) =>
                bookmarks.some(
                  (bookmark) =>
                    bookmark.id === entry.entryID &&
                    bookmark.type === entry.source
                )
              )
            );
          })}
        </div>
      </div>

      {showSelectModal && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen place-items-center outline-none focus:outline-none">
            <div ref={SelectModalRef} className="p-4 grid bg-white">
              <div className="pb-4">
                <div className="float-left uppercase text-green-600 text-2xl">
                  {selectedFlashcardType}
                </div>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowSelectModal(false)}
                >
                  <i className="fv-close"></i>
                </button>
              </div>

              {menuItem(
                'English to Language',
                'fv-refresh-counter-clockwise',
                () => {
                  setSelectedFlashcardDisplayType('e2l');
                }
              )}
              {menuItem('Language to English', 'fv-refresh-clockwise', () => {
                setSelectedFlashcardDisplayType('l2e');
              })}
              {menuItem('Audio to English', 'fv-volume-up', () => {
                setSelectedFlashcardDisplayType('a2e');
              })}
              {menuItem('Mix', 'fv-mix', () => {
                setSelectedFlashcardDisplayType('mix');
              })}
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen place-items-center overflow-y-auto outline-none focus:outline-none">
            <div ref={CategoryModalRef} className="p-4 grid bg-white">
              <div className="pb-4">
                <div className="float-left uppercase text-green-600 text-2xl">
                  {selectedFlashcardType}
                </div>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowCategoryModal(false)}
                >
                  <i className="fv-close"></i>
                </button>
              </div>
              {dataCategories.map((category: FvCategory) => {
                return (
                  <div key={category.id}>
                    {menuItem(category.title, 'fv-categories', () => {
                      const categoryData = dictionaryData.filter((term) => {
                        return (
                          term.theme === category.title ||
                          term.secondary_theme === category.title
                        );
                      });
                      setSelectedFlashcardType(category.title);
                      saveDataForFlashcards(categoryData);
                      setShowCategoryModal(false);
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showFlashcardModal && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen md:place-items-center outline-none focus:outline-none">
            <div className="group h-96 w-90 md:w-[36rem] [perspective:1000px] mt-10 mb-10 p-4">
              <div className="w-full flow-root">
                <div className="grid h-10 w-10 bg-gray-50 float-right rounded-3xl mb-4 md:place-items-center">
                  <button
                    className="p-2 ml-auto bg-transparent border-0 text-black float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowFlashcardModal(false)}
                  >
                    <i className="fv-close"></i>
                  </button>
                </div>
              </div>
              <div
                className={classNames(
                  'bg-gray-50 relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]',
                  { '[transform:rotateY(180deg)]': flipped }
                )}
                onClick={() => setFlipped(!flipped)}
              >
                <div className="absolute inset-0 pl-2 font-bold">
                  {flashcardIndex + 1}/{dataForFlashcardGroup.length}
                </div>
                <div className="absolute inset-0 items-center justify-center flex flex-wrap">
                  <div className="text-4xl text-center break-words w-full">
                    {flashcardData?.type === 'word' && flashcardData?.frontWord}
                    {flashcardData?.type === 'audio' &&
                      flashcardData?.audio?.map((fvAudio: FvAudio) => (
                        <button
                          key={fvAudio.filename}
                          className={secondaryButtonStyle}
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(fvAudio.filename).catch((err: any) => {
                              console.error(err);
                            });
                          }}
                        >
                          <i className="fv-play">{fvAudio.description}</i>
                        </button>
                      ))}
                      <div className="w-full flow-root">
                {flashcardIndex !== 0 && (
                  <div className="grid h-[55px] w-[55px] bg-gray-300 float-left rounded-3xl mt-4">
                    <button
                      className="bg-transparent border-0 text-black text-1xl leading-none font-semibold outline-none focus:outline-none flex-col items-center justify-center flex"
                      onClick={async () => {
                        setFlipped(false);
                        setTimeout(() => {
                          setDataForFlashcard(flashcardIndex - 1);
                        }, 200);
                      }}
                    >
                      <i className="fv-left-bold text-2xl"></i>
                      <div className="italic text-gray-50"><i className="fv-left-open"></i></div>
                    </button>
                  </div>
                )}

                <div className="grid h-[55px] w-[55px] bg-gray-300 float-right rounded-3xl mt-4">
                  <button
                    className="bg-transparent border-0 text-black text-1xl leading-none font-semibold outline-none focus:outline-none flex-col items-center justify-center flex"
                    onClick={async () => {
                      if (flashcardIndex !== dataForFlashcardGroup.length - 1) {
                        setFlipped(false);
                        setTimeout(() => {
                          setDataForFlashcard(flashcardIndex + 1);
                        }, 200);
                      } else {
                        setShowFlashcardModal(false);
                        setShowDonePromptModal(true);
                      }
                    }}
                  >
                    <i className="fv-right-bold text-2xl"></i>
                    <div className="italic text-gray-50"><i className="fv-right-open"></i></div>
                  </button>
                </div>
              </div>
                  </div>
                  <span className="absolute bottom-0 text-center w-full italic text-gray-400">
                    press to flip
                  </span>
                </div>
                <div className="absolute insert-0 h-full w-full rounded-xl bg-black px-12 text-slate-200 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="text-4xl text-center break-words w-full">
                    {flashcardData?.backWord}
                  </div>
                </div>
              </div>
              {/* <div className="w-full flow-root">
                {flashcardIndex !== 0 && (
                  <div className="grid h-[55px] w-[55px] bg-gray-300 float-left rounded-3xl mt-4">
                    <button
                      className="bg-transparent border-0 text-black text-1xl leading-none font-semibold outline-none focus:outline-none flex-col items-center justify-center flex"
                      onClick={async () => {
                        setFlipped(false);
                        setTimeout(() => {
                          setDataForFlashcard(flashcardIndex - 1);
                        }, 200);
                      }}
                    >
                      <i className="fv-left-bold text-2xl"></i>
                      <div className="italic text-gray-50"><i className="fv-left-open"></i></div>
                    </button>
                  </div>
                )}

                <div className="grid h-[55px] w-[55px] bg-gray-300 float-right rounded-3xl mt-4">
                  <button
                    className="bg-transparent border-0 text-black text-1xl leading-none font-semibold outline-none focus:outline-none flex-col items-center justify-center flex"
                    onClick={async () => {
                      if (flashcardIndex !== dataForFlashcardGroup.length - 1) {
                        setFlipped(false);
                        setTimeout(() => {
                          setDataForFlashcard(flashcardIndex + 1);
                        }, 200);
                      } else {
                        setShowFlashcardModal(false);
                        setShowDonePromptModal(true);
                      }
                    }}
                  >
                    <i className="fv-right-bold text-2xl"></i>
                    <div className="italic text-gray-50"><i className="fv-right-open"></i></div>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {showDonePromptModal && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen place-items-center overflow-y-auto outline-none focus:outline-none">
            <div ref={CategoryModalRef} className="p-4 grid bg-white">
              <div className="pb-4">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-1xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowDonePromptModal(false)}
                >
                  <i className="fv-close"></i>
                </button>
                <div className="w-full text-center pl-7 text-xl bold">
                  Congratulations!
                </div>
                <div className="w-full text-center text-xl">Set complete!</div>
                {data.length === 0 && (
                  <div className="text-center text-slate-700 pt-4">
                    You’ve gone through all the cards for this category.
                  </div>
                )}
              </div>
              {menuItem('Restart Set', 'fv-ccw', () => {
                setDataForFlashcard(0);
                setShowDonePromptModal(false);
                setShowFlashcardModal(true);
              })}
              {data.length !== 0 &&
                menuItem('Next Set', 'fv-right-big', () => {
                  saveDataForFlashcards(data);
                  setShowDonePromptModal(false);
                })}
              {menuItem('Done', 'fv-check', () => {
                setShowDonePromptModal(false);
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );

  function saveDataForFlashcards(data: any[]) {
    // Don't continue if there is no data to show.
    if (data.length === 0) {
      return;
    }

    const shuffledData = shuffle(data);
    const flashcardSet = shuffledData.slice(0, flashcardsBatchSize);
    const remainingData = shuffledData.slice(flashcardsBatchSize + 1);
    setData(remainingData);
    setDataForFlashcardGroup(flashcardSet);
  }

  function flashCardType(name: string, icon: string, getTypeData: Function) {
    return (
      <button
        onClick={() => {
          getTypeData();
          setSelectedFlashcardType(name);
        }}
        className={classNames(
          'w-[175px] h-[175px] md:w-[300px] md:h-[150px] m-2 content-center grid grid-cols-1 md:grid-cols-2 cursor-pointer flex justify-center',
          tertiaryButtonStyle
        )}
      >
        <i className={classNames(icon, 'text-6xl ')} />

        <div className="pt-2 text-lg md:text-2xl">{name}</div>
      </button>
    );
  }

  function menuItem(name: string, icon: string, onClick: Function) {
    return (
      <div
        className="border-2 border-solid border-slate-500 rounded-lg bg-slate-100 flex p-4 space-x-6 mb-2 cursor-pointer"
        onClick={() => onClick()}
      >
        <div className={classNames('text-7xl text-slate-700', icon)}></div>
        <div className="text-slate-700 font-bold text-2xl self-center">
          {name}
        </div>
      </div>
    );
  }

  function setDataForFlashcard(fcIndex: number) {
    setFlashcardIndex(fcIndex);
    setFlipped(false);

    // If set to mix select one of the type randomly.
    let displayType = selectedFlashcardDisplayType;
    if (selectedFlashcardDisplayType === 'mix') {
      const index: number = randomIntFromInterval(0, 2);
      const types: string[] = ['e2l', 'l2e', 'a2e'];
      displayType = types[index];
    }

    switch (displayType) {
      case 'e2l': {
        setFlashcardData({
          type: 'word',
          frontWord: dataForFlashcardGroup[fcIndex].definition ?? '',
          backWord: dataForFlashcardGroup[fcIndex].word ?? '',
          audio: null,
        });
        break;
      }

      case 'l2e': {
        setFlashcardData({
          type: 'word',
          frontWord: dataForFlashcardGroup[fcIndex].word ?? '',
          backWord: dataForFlashcardGroup[fcIndex].definition ?? '',
          audio: null,
        });
        break;
      }

      case 'a2e': {
        setFlashcardData({
          type: 'audio',
          frontWord: null,
          backWord: dataForFlashcardGroup[fcIndex].definition ?? '',
          audio: dataForFlashcardGroup[fcIndex].audio,
        });
        break;
      }
    }
  }

  // Min and max are included
  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function playAudio(fileName: string) {
    const audio = new Audio(fileName);
    audio.play().catch((err: any) => {
      console.error(err);
    });
  }
}

export default FlashcardsView;
