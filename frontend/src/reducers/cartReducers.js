import { 
    CART_ADD_ITEM, 
    CART_ADD_ITEM_FAIL, 
    CART_ADD_ITEM_REQUEST, 
    CART_ADD_ITEM_RESET, 
    CART_ADD_ITEM_SUCCESS, 
    CART_DELETE_ITEM_FAIL, 
    CART_DELETE_ITEM_REQUEST, 
    CART_DELETE_ITEM_SUCCESS, 
    CART_ITEM_RESET, 
    CART_LIST_MY_FAIL, 
    CART_LIST_MY_REQUEST, 
    CART_LIST_MY_RESET, 
    CART_LIST_MY_SUCCESS, 
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_UPDATE_ITEM_FAIL,
    CART_UPDATE_ITEM_REQUEST,
    CART_UPDATE_ITEM_RESET,
    CART_UPDATE_ITEM_SUCCESS,
    CART_DETAILS_REQUEST,
    CART_DETAILS_SUCCESS,
    CART_DETAILS_FAIL
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find((x) => x.product === item.product)
            
            if(existItem) {
                return {
                    ...state, 
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x), 
                }
            }
            else{
                return{
                     ...state, 
                     cartItems: [...state.cartItems, item],
                    }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }

        case CART_ITEM_RESET:
            return{ state }

        default:
            return state
    }
}

export const cartAddReducer = (state = {}, action) => {
    switch (action.type) {
      case CART_ADD_ITEM_REQUEST:
        return { loading: true }
      case CART_ADD_ITEM_SUCCESS:
        return { loading: false, success: true, cartItems: action.payload }
      case CART_ADD_ITEM_FAIL:
        return { loading: false, error: action.payload }
      case CART_ADD_ITEM_RESET:
        return {}
      default:
        return state
    }
}
  
export const cartDetailsReducer = (state = { cartItems: {} }, action) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { loading: true, ...state }
    case CART_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      }
    case CART_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cartUpdateReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
      case CART_UPDATE_ITEM_REQUEST:
        return { loading: true }
      case CART_UPDATE_ITEM_SUCCESS:
        return { loading: false, success: true, cartItems: action.payload }
      case CART_UPDATE_ITEM_FAIL:
        return { loading: false, error: action.payload }
      case CART_UPDATE_ITEM_RESET:
        return { cartItems: [] }
      default:
        return state
    }
}
  
export const cartDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CART_DELETE_ITEM_REQUEST:
        return { loading: true }
      case CART_DELETE_ITEM_SUCCESS:
        return { loading: false, success: true }
      case CART_DELETE_ITEM_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}

export const cartListReducer = (state = { cart: [] }, action) => {
    switch (action.type) {
      case CART_LIST_MY_REQUEST:
        return { loading: true, cart: [] }
      case CART_LIST_MY_SUCCESS:
        return { loading: false, sucess: true, cart: action.payload }
      case CART_LIST_MY_FAIL:
        return { loading: false, error: action.payload }
      case CART_LIST_MY_RESET:
        return { cart: [] }
      default:
        return state
    }
}