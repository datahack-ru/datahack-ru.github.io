import React from 'react';
import { useTranslation } from 'react-i18next';
import getExternalLinkProps from '../../utils/getExternalLinkProps';
import { Modal } from '../ModalProvider';



interface Props {
  data?: any;
  onDismiss?: () => void;
}


const ChangeNetworkModal: React.FC<Props> = ({ data, onDismiss = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('Change Network')} onDismiss={onDismiss}>
      <p>{t('Change Network in your Wallet')}
      </p>
    </Modal>
  )
};

export default ChangeNetworkModal;
