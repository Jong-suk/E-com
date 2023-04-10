import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_ADD_ITEM_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_DELETE_ITEM_FAIL,
    CART_DELETE_ITEM_REQUEST,
    CART_DELETE_ITEM_SUCCESS,
    CART_ITEM_RESET,
    CART_LIST_MY_FAIL,
    CART_LIST_MY_REQUEST,
    CART_LIST_MY_SUCCESS,
    CART_REMOVE_ITEM ,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_UPDATE_ITEM_FAIL,
    CART_UPDATE_ITEM_REQUEST,
    CART_UPDATE_ITEM_SUCCESS
} from './../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const resetCartItems = () => (dispatch) => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: CART_ITEM_RESET })
}

export const createCartItem = (cartItem) => async(dispatch, getState) => {

    try {
        dispatch({
            type: CART_ADD_ITEM_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/cart`, cartItem, config)

        dispatch({
            type: CART_ADD_ITEM_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }

  }

  export const updateCartItem = (cartItem) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_UPDATE_ITEM_REQUEST,
      })

      const { userLogin: { userInfo } } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(`/api/cart`, cartItem, config)

      dispatch({
        type: CART_UPDATE_ITEM_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: CART_UPDATE_ITEM_FAIL,
        payload: message,
      })
    }
  }

  export const deleteCartItem = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CART_DELETE_ITEM_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/cart/${id}`, config)

        dispatch({
            type: CART_DELETE_ITEM_SUCCESS
        })
      } catch (error) {
        dispatch({
            type: CART_DELETE_ITEM_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }

  export const listMyCart = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: CART_LIST_MY_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/cart`, config)

        dispatch({
            type: CART_LIST_MY_SUCCESS,
            payload: data
        })
        localStorage.setItem('cartItems', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: CART_LIST_MY_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
}