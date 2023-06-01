import React, { useEffect, useState } from 'react';
import { dataDict } from '../temp-word-list';
import WordModal from './word-modal';
import Modal from '../common/modal/modal';
import fetchWordOfDayData from '../../services/apiService';

function WordOfTheDay() {
  const today = new Date();
  const [showModal, setShowModal] = React.useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchData().catch((err: any) => {
      console.log(err);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setData(await getWordOfTheDay());
  };

  return (
    <>
      {data ? (
        showModal && (
          <Modal onClose={() => wordOfTheDaySeen()} title="Word of the Day">
            <WordModal term={data} />
          </Modal>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );

  async function getWordOfTheDay() {
    try {
      const data = await fetchWordOfDayData();
      return (
        dataDict.find((term) => term.entryID === data.dictionaryEntry.id) ??
        dataDict[Math.floor(Math.random() * dataDict.length)]
      );
    } catch (error: any) {
      return dataDict[Math.floor(Math.random() * dataDict.length)];
    }
  }

  function wordOfTheDaySeen() {
    localStorage.setItem('lastWOTDSeenOn', today.toDateString());
    setShowModal(false);
  }
}

export default WordOfTheDay;
