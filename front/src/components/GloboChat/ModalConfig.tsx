'use client';

import { useEffect } from 'react';
import Modal from 'react-modal';

const ModalConfig: React.FC = () => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return null;
};

export default ModalConfig;
