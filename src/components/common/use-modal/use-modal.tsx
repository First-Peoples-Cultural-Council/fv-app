import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook to handle modal functionality
export function useModal(initialShowModal = false) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(initialShowModal);

  useEffect(() => {
    function handleBodyOverflow() {
      document.body.style.overflow = showModal ? 'hidden' : 'unset';
    }

    handleBodyOverflow();

    return () => {
      handleBodyOverflow();
    };
  }, [showModal]);

  function closeModal() {
    const sourcePageUrl = window.location.hash.split('?')[1]?.split('=')[1];
    if (sourcePageUrl) {
      navigate(sourcePageUrl);
    }
    setShowModal(false);
  }

  return { setShowModal, showModal, closeModal };
}
