import React from 'react';
import { dataDict } from '../temp-word-list';
import WordModal from './word-modal';
import Modal from '../common/modal/modal';

function WordOfTheDay() {
  const today = new Date();
  const [showModal, setShowModal] = React.useState(true)

  return (
    <>
      {showModal && (
        <Modal onClose={() => wordOfTheDaySeen()} title="Word of the Day">
          <WordModal term={getWordOfTheDay()} />
        </Modal>
      )}
    </>
  );

  function getWordOfTheDay() {
    return dataDict[Math.floor(Math.random()*dataDict.length)];
  }

  function wordOfTheDaySeen() {
    localStorage.setItem('lastWOTDSeenOn', today.toDateString());
    setShowModal(false);
  }
}

export default WordOfTheDay;
