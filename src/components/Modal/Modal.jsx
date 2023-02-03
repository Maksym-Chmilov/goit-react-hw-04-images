import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { ModalBox, ModalImg, Overlay } from './Modal.styled';

export const Modal = ({ clickModal, imgUrl }) => {
  useEffect(() => {
    window.addEventListener('keydown', clickModal);

    return () => {
      window.removeEventListener('keydown', clickModal);
    };
  }, [clickModal]);

  return (
    <Overlay onClick={clickModal}>
      <ModalBox>
        <ModalImg src={imgUrl} alt="" onClick={e => e.stopPropagation()} />
      </ModalBox>
    </Overlay>
  );
};

Modal.propTypes = {
  imgUrl: propTypes.string.isRequired,
  clickModal: propTypes.func.isRequired,
};
