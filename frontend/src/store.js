import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk'
import { 
    productCreateReducer, 
    productDeleteReducer, 
    productDetailsReducer, 
    productListReducer, 
    productReviewCreateReducer, 
    productReviewDeleteReducer, 
    productReviewUpdateReducer, 
    productTopRatedReducer, 
    productUpdateReducer 
} from "./reducers/productReducers";
import { cartAddReducer, cartDeleteReducer, cartListReducer, cartReducer, cartUpdateReducer } from "./reducers/cartReducers";
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer, 
    userUpdateReducer, 
    userCreateReducer
} from "./reducers/userReducers";
import { farmerListReducer, farmerDetailsReducer, farmerProductListReducer } from "./reducers/farmerReducers";
import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderMyListReducer, 
    orderListReducer, 
    orderDeliverReducer 
} from './reducers/orderReducers';

const reducers = combineReducers({
    productList : productListReducer, 
    productDetails : productDetailsReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productDelete : productDeleteReducer,
    productReviewCreate : productReviewCreateReducer,
    productReviewUpdate : productReviewUpdateReducer,
    productReviewDelete : productReviewDeleteReducer,
    productTopRated: productTopRatedReducer,
    cart : cartReducer,
    cartAdd : cartAddReducer,
    cartUpdate : cartUpdateReducer,
    cartDelete : cartDeleteReducer,
    cartList : cartListReducer, 
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    userCreate : userCreateReducer,
    farmerList : farmerListReducer, 
    farmerDetails : farmerDetailsReducer,
    farmerProductList : farmerProductListReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderDeliver : orderDeliverReducer,
    orderMyList : orderMyListReducer,
    orderList : orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null


const initialState = {
    cart : { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage },
    userLogin : { userInfo: userInfoFromStorage },
}

const middleware = [thunk]
 
const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
})

export default store