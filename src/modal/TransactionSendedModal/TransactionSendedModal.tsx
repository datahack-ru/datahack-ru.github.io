import React from 'react';
import { useTranslation } from 'react-i18next';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import { Modal } from '../ModalProvider';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const TransactionSendedModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Transaction sended')} onDismiss={onDismiss}>
      <p>tx: {data.hash}</p>
    </Modal>
  )
};

export default TransactionSendedModal;
