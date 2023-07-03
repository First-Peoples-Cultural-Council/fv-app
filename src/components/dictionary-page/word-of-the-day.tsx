import React, { useEffect, useState } from 'react';
import WordModal from './word-modal';
import Modal from '../common/modal/modal';
import fetchWordOfDayData from '../../services/wordOfTheDayApiService';
import { FvWord } from '../common/data';
import fetchWordsData from '../../services/wordsApiService';

function WordOfTheDay() {
  const today = new Date();
  const [showModal, setShowModal] = React.useState(true);
  const [data, setData] = useState<any>(null);
  const [dataDict, setDataDict] = useState<FvWord[]>([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData();
        setDataDict(result);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setData(await getWordOfTheDay());
    };

    fetchData().catch((err: any) => {
      console.log(err);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDict]);

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
      console.log("getting word of the day data");
      const data = await fetchWordOfDayData();
      console.log("returning word of the day data")
      return (
        dataDict.find((term) => term.entryID === data.dictionaryEntry.id) ??
        dataDict[Math.floor(Math.random() * dataDict.length)]
      );
    } catch (error: any) {
      console.log("error getting word of the day data");
      return dataDict[Math.floor(Math.random() * dataDict.length)];
    }
  }

  function wordOfTheDaySeen() {
    localStorage.setItem('lastWOTDSeenOn', today.toDateString());
    setShowModal(false);
  }
}

export default WordOfTheDay;
