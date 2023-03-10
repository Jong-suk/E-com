import {
    FARMER_LIST_REQUEST,
    FARMER_LIST_SUCCESS,
    FARMER_LIST_FAIL,
    FARMER_DETAILS_REQUEST,
    FARMER_DETAILS_SUCCESS,
    FARMER_DETAILS_FAIL,
  } from '../constants/farmerConstants'
  
  export const farmerListReducer = (state = { farmers: [] }, action) => {
    switch (action.type) {
      case FARMER_LIST_REQUEST:
        return { loading: true, farmers: [] }
      case FARMER_LIST_SUCCESS:
        return {
          loading: false,
          farmers: action.payload
        }
      case FARMER_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const farmerDetailsReducer = (state = { farmer: { reviews: [] } }, action) => {
    switch (action.type) {
      case FARMER_DETAILS_REQUEST:
        return { loading: true, ...state }
      case FARMER_DETAILS_SUCCESS:
        return {
          loading: false,
          farmer: action.payload
        }
      case FARMER_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }