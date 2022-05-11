import { PhotosState, PhotosAction, GET_PHOTOS, SET_ERROR } from '../types';

const initialState: PhotosState = {
  photos: [],
  total_results: 0,
  error: ''
}

const photoReducer = (state = initialState, action: PhotosAction): PhotosState => {
  switch(action.type) {
    case GET_PHOTOS:
      const { photos, total_results } = action.payload;
      return {
        ...state,
        photos,
        total_results: total_results,
        error: ''
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default photoReducer;