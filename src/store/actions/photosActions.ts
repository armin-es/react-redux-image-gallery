import axios from 'axios';
import {PhotosWithTotalResults} from '../../types'
import { PhotosAction, GET_PHOTOS, SET_ERROR } from '../types';

export const getPhotos = (page: number, searchQuery: string, onSuccess: () => void, onError: () => void) => {
  return async (dispatch: any) => {
    try {
      const {data: {collection: photos}} = await axios.get<PhotosWithTotalResults>(`https://images-api.nasa.gov/search?q=${searchQuery}&page=${page}`); //{ page, query: searchQuery, per_page: 10}

        dispatch({
          type: GET_PHOTOS,
          payload: {
            photos: photos.items,
            page: page,
            total_results: photos.metadata.total_hits
          }
        });
        onSuccess();

    } catch (err: any) {
      console.log(err);
      dispatch(setError(err.response.data.reason));
      onError();
    }
  }
}

export const setError = (err: string): PhotosAction => {
  return {
    type: SET_ERROR,
    payload: err
  }
}