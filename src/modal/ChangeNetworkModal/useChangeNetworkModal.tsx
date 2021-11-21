import React from 'react';
import { useModal } from '../ModalProvider';
import ChangeNetworkModal from './ChangeNetworkModal';



interface ReturnType {
  onPresentChangeNetworkModal: (data?: any) => void;
}

const useChangeNetworkModal = (): ReturnType => {
  const [onPresentChangeNetworkModal] = useModal(<ChangeNetworkModal />);
  return { onPresentChangeNetworkModal };
};

export default useChangeNetworkModal;
