import React, { useEffect, useState } from 'react';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

// FPCC
import WordModal from '../dictionary-view/word-modal';
import Modal from '../common/modal/modal';
import fetchWordOfDayData from '../../services/wordOfTheDayApiService';
import { FvWord } from '../common/data';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';
import { useAudio } from '../contexts/audioContext';

export interface WordOfTheDayProps {
  dictionaryData: FvWord[];
}

function WordOfTheDay({ dictionaryData }: Readonly<WordOfTheDayProps>) {
  const today = new Date();
  const { stopAll } = useAudio();

  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (
      today.toDateString() !== (localStorage.getItem('lastWOTDSeenOn') ?? '')
    ) {
      setShowModal(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('word-of-the-day-modal-open');
    } else {
      document.body.classList.remove('word-of-the-day-modal-open');
    }

    return () => {
      document.body.classList.remove('word-of-the-day-modal-open');
    };
  }, [showModal]);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getWordOfTheDay());
    };

    fetchData().catch((err: any) => {
      console.error(err);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictionaryData]);

  async function getWordOfTheDay() {
    try {
      const data = await fetchWordOfDayData();
      return (
        dictionaryData.find(
          (term) => term.entryID === data.dictionaryEntry.id
        ) ??
        dictionaryData[
          Math.floor(Math.random() * (dictionaryData?.length || 0))
        ]
      );
    } catch (error: any) {
      return dictionaryData?.[
        Math.floor(Math.random() * (dictionaryData?.length || 0))
      ];
    }
  }

  function wordOfTheDaySeen() {
    localStorage.setItem('lastWOTDSeenOn', today.toDateString());
    setShowModal(false);
  }

  if (data) {
    if (showModal) {
      if (window.matchMedia('(min-width: 768px').matches) {
        console.info('larger than 768px');
        return (
          <Modal onClose={() => wordOfTheDaySeen()} title="Word of the Day">
            <WordModal
              term={data}
              onClose={() => {
                wordOfTheDaySeen();
                stopAll();
              }}
            />
          </Modal>
        );
      } else if (!window.matchMedia('(min-width: 768px').matches) {
        console.info('smaller than 768px');
        return (
          <FullScreenModal onClose={() => wordOfTheDaySeen()}>
            <div className="flex w-full text-center text-3xl mb-5">
              Word of the Day
            </div>
            <WordModal
              term={data}
              onClose={() => {
                wordOfTheDaySeen();
                stopAll();
              }}
            />
          </FullScreenModal>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return <LoadingSpinner />;
  }
}

export default WordOfTheDay;
