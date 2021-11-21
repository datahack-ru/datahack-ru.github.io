import React, { useState } from 'react';
import { Header, Modal as ModalUi } from 'semantic-ui-react';
import { ModalProps } from './types';



const Modal: React.FC<ModalProps> = ({
  title,
  actions,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = '24px',
  //headerBackground = 'transparent',
  //minWidth = '320px',
  open = true,
  ...props
}) => {
  return (
    <ModalUi
      closeIcon={!hideCloseButton}
      //minWidth={minWidth}
      {...props}
      open={open}
      onClose={onDismiss}
    >
      <ModalUi.Header style={{ backgroundColor: '#93a5ff', }}>
        <Header>{title}</Header>
      </ModalUi.Header>
      <ModalUi.Content style={{ background: 'linear-gradient(to bottom, #93a5ff, #dbe0fa 300px)', }}>{children}</ModalUi.Content>
      <ModalUi.Actions style={{ backgroundColor: '#dbe0fa', }}>{actions}</ModalUi.Actions>
    </ModalUi>
  )
};

export default Modal;
