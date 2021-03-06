import {
    ADDING_WATCHLIST_START,
    ADDING_WATCHLIST_SUCCESS,
    ADDING_WATCHLIST_FAIL,

    REMOVING_FROM_WATCHLIST_START,
    REMOVING_FROM_WATCHLIST_SUCCESS,
    REMOVING_FROM_WATCHLIST_FAIL,

    FETCHING_WATCHLIST_START,
    FETCHING_WATCHLIST_SUCCESS,
    FETCHING_WATCHLIST_FAIL
  } from "../actions/watchlistActions";
  
  const initialState = {
    movies: [],
    isFetching: false,
    isAdding: false,
    isDeleting: false,
    error: ""
  };
  
  export const watchlist = (state = initialState, action) => {
    switch (action.type) {
      // ADD TO WATCHLIST START
      case  ADDING_WATCHLIST_START:
        return {
          ...state,
          isAdding: true
        }
      // ADD TO WATCHLIST SUCCESS
      case  ADDING_WATCHLIST_SUCCESS:
        return {
          ...state,
          isAdding: false,
        
        };
  
      // ADD TO WATCHLIST FAIL
      case  ADDING_WATCHLIST_FAIL:
        return {
          ...state,
          isAdding: false,
          error: action.payload
        };

      // REMOVE FROM WATCHLIST START
      case  REMOVING_FROM_WATCHLIST_START:
        return {
          ...state,
          isDeleting: true
        }
      // REMOVE FROM WATCHLIST SUCCESS
      case  REMOVING_FROM_WATCHLIST_SUCCESS:
        return {
          ...state,
          isDeleting: false,
        
        };
  
      // REMOVE FROM WATCHLIST FAIL
      case  REMOVING_FROM_WATCHLIST_FAIL:
        return {
          ...state,
          isDeleting: false,
          error: action.payload
        };

      // GET WATCHLIST START
      case FETCHING_WATCHLIST_START:
        return {
          ...state,
          isFetching: true
        }
      // GET WATCHLIST SUCCESS
      case FETCHING_WATCHLIST_SUCCESS:
        return {
          ...state,
          isFetching: false,
          movies: action.payload
        };
  
      // GET WATCHLIST FAIL
      case FETCHING_WATCHLIST_FAIL:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };