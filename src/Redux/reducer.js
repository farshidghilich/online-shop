export const getAllProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'GET_ALL_REQUEST':
      return { loading: true, }
    case 'GET_ALL_SUCSSES':
      return { loading: false, products: action.payload }
    case 'GET_ALL_FAILED':
      return { loading: false, error: action.payload }
    default:
      return { ...state }
  }
}
export const productReducer = (
  state = { loading: false, product: {} },
  action
) => {
  switch (action.type) {
    case 'GET_PRODUCT_REQUEST':
      return { loading: true }
    case 'GET_PRODUCT_SUCSSES':
      return { loading: false, product: action.payload }
    case 'GET_PRODUCT_FAILED':
      return { loading: false, error: action.payload }
    default:
      return { ...state }
  }
}
// Login
export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNIN_REQUEST":
      return { loading: true, ...state }
    case "USER_SIGNIN_SUCSSES":
      return { loading: false, userInfo: action.payload }
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_SIGNOUT":
      return {}
    default:
      return { ...state }
  }
}
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export const userdetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_USER_DETAILS_REQUEST':
      return { loading: true }
    case 'GET_USER_DETAILS_SUCCESS':
      return { loading: false, user: action.payload }
    case 'GET_USER_DETAILS_FAILED':
      return { loading: false, error: action.payload }



    default:
      return state
  }
}
export const updateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_REQUEST':
      return { loading: true }
    case 'UPDATE_PROFILE_SUCCESS':
      return { loading: false, success: true }
    case 'UPDATE_PROFILE_FAILED':
      return { loading: false, error: action.payload }
    case 'UPDATE_PROFILE_RESET':
      return {}
    default:
      return state
  }
}
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CARD_ITEMS":
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      if (existItem) {
        return { ...state, cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x) }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case 'REMOVE_ITEM':
      return { ...state, cartItems: state.cartItems.filter((x) => x.product !== action.payload), }
    case 'SAVE_ADDRESS':
      return { ...state, shippingAddress: action.payload }
    case 'SAVE-PAYMENTMETHOD':
      return { ...state, paymentmethod: action.payload }
    case 'CART_EMPTY':
      return { ...state, cartItems: [] }
    default:
      return state
  }
}
export const orderCreateReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_REQUEST':
      return { loading: true };
    case 'ORDER_CREATE_SUCCESS':
      return { loading: false, success: true, order: action.payload };
    case 'ORDER_CREATE_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_CREATE_RESET':
      return {};
    default:
      return state;
  }
};
export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUEST':
      return { loading: true };
    case 'ORDER_DETAILS_SUCCESS':
      return { loading: false, success: true, order: action.payload };
    case 'ORDER_DETAILS_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'GET_ORDERS_LIST_REQUEST':
      return { loading: true }
    case 'GET_ORDERS_LIST_SUCCESS':
      return { loading: false, orders: action.payload }
    case 'GET_ORDERS_LIST_FAILED':
      return { loading: false, error: action.payload }
    default:
      return state
  }

}