import axios from "axios"
// allproducts
export const Getallproducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_ALL_REQUEST' })
        const { data } = await axios.get
            ('http://95.216.184.20:9000/api/products')


        dispatch({ type: 'GET_ALL_SUCSSES', payload: data })
        localStorage.setItem('products', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'GET_ALL_FAILED', payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

///product 
export const productAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_PRODUCT_REQUEST' })
        const { data } = await axios.get
            (`http://95.216.184.20:9000/api/products/${id}`)
        dispatch({ type: 'GET_PRODUCT_SUCSSES', payload: data })

        console.log(data)
    } catch (error) {
        dispatch({
            type: 'GET_PRODUCT_FAILED', payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })

    }



}
/* login */
export const signIn = (email, password) => async (dispatch) => {

    try {

        dispatch({ type: "USER_SIGNIN_REQUEST" })
        const { data } = await axios.post('http://95.216.184.20:9000/api/users/login', { email, password })
        dispatch({ type: "USER_SIGNIN_SUCSSES", payload: data })

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAIL", payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }

}
///logout
export const signoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress')
    dispatch({ type: "USER_SIGNOUT" })
}
// signup/////////////////////////////////////////////////////////////////////////////
export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST", payload: { name, email, password } });
    try {

        const { data } = await axios.post
            ("http://95.216.184.20:9000/api/users",
                { name, email, password });
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: "USER_REGISTER_FAIL", payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}
// userDetails//////////////////////////////////////////////////////
export const userdetailsAction = (id) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        dispatch({ type: 'GET_USER_DETAILS_REQUEST' })
        const { data } = await axios.get(`http://95.216.184.20:9000/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
        dispatch({ type: 'GET_USER_DETAILS_SUCCESS', payload: data })
        localStorage.setItem('user', JSON.stringify(data))
        console.log(data)
    } catch (error) {
        dispatch({
            type: 'GET_USER_DETAILS_FAILED',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })

    }
}
////////////////////////////////////////////////////////////////////////////////////////
export const updateProfileAction = (name, email, password) => async (dispatch, getState) => {
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        dispatch({ type: 'UPDATE_PROFILE_REQUEST' })
        const { data } = await axios.put(`http://95.216.184.20:9000/api/users/profile`,
            { name, email, password }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
        dispatch({ type: 'UPDATE_PROFILE_SUCCESS', payload: data })
        dispatch({ type: "USER_SIGNIN_SUCSSES", payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
        console.log(data)
    } catch (error) {
        dispatch({
            type: 'UPDATE_PROFILE_FAILED', payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
export const cartAction = (id, qty) => async (dispatch, getstate) => {
    const { data } = await axios.get(`http://95.216.184.20:9000/api/products/${id}`)
    dispatch({
        type: "ADD_TO_CARD_ITEMS", payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))

}
export const removeAction = (id) => (dispatch, getstate) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    localStorage.setItem('cartitems', JSON.stringify(getstate().cart.cartItems));
    // localStorage.removeItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}
export const shippingAction = (data) => (dispatch) => {
    dispatch({ type: 'SAVE_ADDRESS', payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
    console.log(data)
}
export const paymentAction = (data) => (dispatch) => {
    dispatch({ type: 'SAVE-PAYMENTMETHOD', payload: data })
    localStorage.setItem('paymentmethod', JSON.stringify(data))
}
export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: 'ORDER_CREATE_REQUEST' });
    try {
        const {
            userSignin: { userInfo },
        } = getState();
        const { data } = await axios.post('http://95.216.184.20:9000/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });

        dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data });

        localStorage.getItem('orderCreate', JSON.stringify(data))
        console.log(data)
        dispatch({ type: 'CART_EMPTY' });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: 'ORDER_DETAILS_REQUEST', payload: orderId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await axios.get(`http://95.216.184.20:9000/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: 'ORDER_DETAILS_FAIL', payload: message });
    }
};
export const myOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'GET_ORDERS_LIST_REQUEST' })
        const { userSignin: { userInfo } } = getState()
        const { data } = await axios.get('http://95.216.184.20:9000/api/orders/myorders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
        dispatch({ type: 'GET_ORDERS_LIST_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'GET_ORDERS_LIST_FAILED',
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}