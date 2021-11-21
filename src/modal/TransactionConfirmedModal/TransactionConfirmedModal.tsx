import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ModalProvider';
import getExternalLinkProps from '../../utils/getExternalLinkProps';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const TransactionConfirmedModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Transaction confirmed')} onDismiss={onDismiss}>
      <p>tx: {data.hash}</p>
    </Modal>
  )
};

export default TransactionConfirmedModal;
