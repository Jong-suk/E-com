import {
    FARMER_LIST_REQUEST,
    FARMER_LIST_SUCCESS,
    FARMER_LIST_FAIL,
    FARMER_DETAILS_REQUEST,
    FARMER_DETAILS_SUCCESS,
    FARMER_DETAILS_FAIL,
    FARMER_PRODUCTS_REQUEST,
    FARMER_PRODUCTS_SUCCESS,
    FARMER_PRODUCTS_FAIL,
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

  export const farmerProductListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case FARMER_PRODUCTS_REQUEST:
        return { loading: true, products: [] }
      case FARMER_PRODUCTS_SUCCESS:
        return {
          loading: false,
          products: action.payload
        }
      case FARMER_PRODUCTS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }