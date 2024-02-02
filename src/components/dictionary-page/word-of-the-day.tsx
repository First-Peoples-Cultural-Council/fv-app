import React, { useEffect, useState } from 'react';
import WordModal from './word-modal';
import Modal from '../common/modal/modal';
import fetchWordOfDayData from '../../services/wordOfTheDayApiService';
import { FvWord } from '../common/data';
import fetchWordsData from '../../services/wordsApiService';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';

function WordOfTheDay() {
  const today = new Date();

  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState<any>(null);
  const [dataDict, setDataDict] = useState<FvWord[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData();
        setDataDict(result.data);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();

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
  }, [dataDict]);

  async function getWordOfTheDay() {
    try {
      const data = await fetchWordOfDayData();
      return (
        dataDict.find((term) => term.entryID === data.dictionaryEntry.id) ??
        dataDict[Math.floor(Math.random() * (dataDict?.length || 0))]
      );
    } catch (error: any) {
      return dataDict?.[Math.floor(Math.random() * (dataDict?.length || 0))];
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
            <WordModal term={data} onClose={() => wordOfTheDaySeen()} />
          </Modal>
        );
      } else if (!window.matchMedia('(min-width: 768px').matches) {
        console.info('smaller than 768px');
        return (
          <FullScreenModal
            onClose={() => wordOfTheDaySeen()}
            actions={null}
            title="Word of the Day"
          >
            <WordModal term={data} onClose={() => wordOfTheDaySeen()} />
          </FullScreenModal>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return <div>Loading...</div>;
  }
}

export default WordOfTheDay;
