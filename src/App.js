import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import './App.css';

import { getPhotos, setError } from './store/actions/photosActions';
import { RootState } from './store';
import Intro from './components/Intro';
import Modal from './components/Modal';
import { Photo } from './types';
import Pagination from '@mui/material/Pagination';

const App = () => {
  const dispatch = useDispatch();
  const { photos, total_results, error } = useSelector((state) => state.photos);
  const [mode, setMode] = useState('trending');
  const [searchFor, setSearchFor] = useState('');
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState('Trending');
  const [btnLoading, setBtnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const searchPhotosHandler = (query) => {
    if(error) {
      setError(error);
    }
    setMode('search');
    setSearchFor(query);
    setPage(1);
    dispatch(getPhotos(1, query, () => {}, () => {}));
    setTitle(`Search results for "${query}"`);
  }

  const loadMoreHandler = (event, number) => {
    setBtnLoading(true);
    setPage(number);
      dispatch(getPhotos(number, searchFor, () => setBtnLoading(false), () => setBtnLoading(false)));
  }

  const modalCloseHandler = () => {
    setSrc('');
    setImageTitle('');
    setShowModal(false);
  }

  const imageClickHandler = (e, photo) => {
    e.preventDefault();
    setSrc(photo.links[0].href);
    setImageTitle(photo.data[0].title);
    setShowModal(true);
  }

    const content = (
      error 
      ? <div className="notification is-danger mt-6 has-text-centered">{error}</div>
      :
      <>
          {photos.length > 0
            ? <ResponsiveMasonry columnsCountBreakPoints={{480: 2, 900: 5}}>
              <Masonry gutter={20}>
                {photos?.map(photo => {
                  return(
                  <div key={photo.data[0].nasa_id} className="masonry-item">
                    <a href="/#" onClick={(e) => {}}>
                      {photo.links && <img src={photo.links[0].href} alt="" onClick={(e) => imageClickHandler(e, photo)} /> }
                    </a>
                  </div>
                )}
                )}
              </Masonry>
            </ResponsiveMasonry>
            : <p className="has-text-centered">No results</p>
          }

          <div className="is-flex is-justify-content-center py-6">
            {((total_results > 100)) 
              && <Pagination count={Math.ceil(total_results / 100)} showFirstButton showLastButton page={page} onChange={loadMoreHandler}/>
            }
          </div>
        </>
    );

  return (
    <div>
      <Intro onSearch={searchPhotosHandler} />
      <div className="container px-4">
        { content }
      </div>
      {showModal && <Modal src={src} onClose={modalCloseHandler} imageTitle={imageTitle} />}
    </div>
  );
  }

export default App;
