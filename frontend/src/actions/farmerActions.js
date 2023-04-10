import axios from 'axios'
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

export const listFarmers = () => async (dispatch) => {
  try {
    dispatch({ type: FARMER_LIST_REQUEST })

    const { data } = await axios.get('/api/farmers')

    dispatch({
      type: FARMER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FARMER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listFarmerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FARMER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/farmers/${id}`)

    dispatch({
      type: FARMER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FARMER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listFarmerProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: FARMER_PRODUCTS_REQUEST })

    const { data } = await axios.get(`/api/farmers/${id}/products`)

    console.log(data)

    dispatch({
      type: FARMER_PRODUCTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FARMER_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}