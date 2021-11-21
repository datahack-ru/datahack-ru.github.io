import React from 'react';
import { useModal } from '../ModalProvider';
import InfoModal from './InfoModal';



interface ReturnType {
  onPresentInfoModal: (data?: any) => void;
}

const useInfoModal = (): ReturnType => {
  const [onPresentInfoModal] = useModal(<InfoModal />);
  return { onPresentInfoModal };
};

export default useInfoModal;
