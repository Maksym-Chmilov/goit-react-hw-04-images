import React, { useState, useEffect } from 'react';
import { Modal } from 'components/Modal/Modal';
import { AppBox } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { addFotoObj } from 'services/image-api';
import { Errors } from 'components/Errors/Errors';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [response, setResponse] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [button, setButton] = useState(false);
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  const formSubmitHandler = input => {
    cleanState();
    setInputSearch(input);
  };

  const getFotos = async (input, page) => {
    setIsLoading(true);

    try {
      const fotoObj = await addFotoObj(input, page);

      if (response.length === 0) {
        setResponse(fotoObj);
        setErrorMessage(false);
        setIsLoading(false);
      } else {
        setResponse(prevState => [...prevState, ...fotoObj]);
      }
      if (fotoObj.length === 12) setButton(true);

      if (fotoObj.length === 0) {
        setErrorMessage(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const handleModal = ({ key, target }) => {
    if (key === 'Escape' || target.tagName === 'DIV') {
      setModal(false);
    }
  };

  const onImageClick = largeImage => {
    setModal(true);
    setLargeImageUrl(largeImage);
  };

  function cleanState() {
    setResponse([]);
    setPageNumber(1);
    setButton(false);
  }

  useEffect(() => {
    if (inputSearch === '') {
      return;
    } else getFotos(inputSearch, pageNumber);
  }, [pageNumber, inputSearch]);

  return (
    <AppBox>
      <Searchbar clickSubmit={formSubmitHandler} />
      {isLoading && <Loader />}
      <ImageGallery images={response} clickImage={onImageClick} />
      {errorMessage && <Errors />}
      {button && <Button clickMore={loadMore} />}
      {modal && <Modal clickModal={handleModal} imgUrl={largeImageUrl} />}
    </AppBox>
  );
};
