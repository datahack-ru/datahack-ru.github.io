import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ModalProvider';
import { isProduction } from '../../constants/index';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const InfoModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Information')} onDismiss={onDismiss}>
      <p>{data.message}</p>
    </Modal>
  )
};

export default InfoModal;
