import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  getAllProductsReducer,
  productReducer, userSigninReducer,
  userRegisterReducer, cartReducer,
  orderCreateReducer,
  orderDetailsReducer, myOrdersReducer, userdetailsReducer, updateProfileReducer,
} from './reducer'

const reducers = combineReducers({
  products: getAllProductsReducer,
  oneproduct: productReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
  userdetails: userdetailsReducer,
  updateProfile: updateProfileReducer,
})
const initialStates = {
  orderCreate: {
    order: localStorage.getItem('orderCreate') ?
      JSON.parse(localStorage.getItem('orderCreate')) : []
  },
  // userdetails: {
  //   user: localStorage.getItem('user') ?
  //     JSON.parse(localStorage.getItem('user')) : null
  // },
  orderDetails: {
    order: localStorage.getItem('orderDetail')
      ? JSON.parse(localStorage.getItem('orderDetail')) : []
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress')) : [],
    paymentmethod: localStorage.getItem('paymentmethod')
      ? JSON.parse(localStorage.getItem('paymentmethod')) : []
  },
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ?
      JSON.parse(localStorage.getItem('userInfo')) : null
  },

}
const middlewares = [thunk]
export const store = createStore(
  reducers,
  initialStates,
  composeWithDevTools(applyMiddleware(...middlewares))
)
