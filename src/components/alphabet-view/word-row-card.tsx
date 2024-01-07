import { useLocation } from 'react-router-dom';
import WordModal from '../dictionary-page/word-modal';
import { FvWord } from '../common/data';
import Modal from '../common/modal/modal';
import FullScreenModal from '../common/full-screen-modal/full-screen-modal';
import { useModal } from '../common/use-modal/use-modal';
import { useEffect } from 'react';

function WordAlphabetRowCard(props: { term: FvWord }) {
  const { term } = props;
  const location = useLocation();
  const { setShowModal, showModal, closeModal } = useModal();
  const { word, definition } = term;

  useEffect(() => {
    if (
      location.hash === `#${term.source}-${term.entryID}` ||
      location.hash === `#${term.source}-${term.entryID}?source=/profile`
    ) {
      setShowModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <div
        className="rounded-lg bg-white p-6 m-2 shadow-lg hover:bg-slate-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-9">
            <div>
              <h1 className="font-bold">{word}</h1>
            </div>
            <h1>{definition}</h1>
          </div>
          <div className="place-self-end self-center">
            <i className="fv-right-open" />
          </div>
        </div>
      </div>
      {window.matchMedia('(min-width: 768px').matches && showModal && (
        <Modal onClose={() => closeModal()}>
          <WordModal term={term} onClose={() => closeModal()} />
        </Modal>
      )}
      {!window.matchMedia('(min-width: 768px').matches && showModal && (
        <FullScreenModal onClose={() => closeModal()} actions={null}>
          <WordModal term={term} onClose={() => closeModal()} />
        </FullScreenModal>
      )}
    </>
  );
}

export default WordAlphabetRowCard;
