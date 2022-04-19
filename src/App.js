import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Cart from './componnets/Cart';

import Header from './componnets/Header';

import HomeScreen from './componnets/HomeScreen';
import Order from './componnets/Order';
import OrderDetail from './componnets/OrderDetail';
import OrderHistory from './componnets/OrderHistory';
import PaymentMethod from './componnets/PaymentMethod';
import Porofile from './componnets/Porofile';
import PrivateRoute from './componnets/PrivateRoute';

import ProductScreen from './componnets/ProductScreen';
import Register from './componnets/Register';
import Shipping from './componnets/Shipping';
import Signin from './componnets/Signin';




function App() {

  return (
    <BrowserRouter>
      <div className="grid">
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />} exact></Route>
          <Route path='/products' element={<HomeScreen />}></Route>
          <Route path='/product/:id' element={<ProductScreen />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/cart/:id" element={<Cart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
          <Route path='/payment' element={<PaymentMethod />}></Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path="/orders/:id" element={<OrderDetail />}></Route>
          <Route path='/orders' element={<OrderHistory />}></Route>
          <Route path='/profile' element={<PrivateRoute>
            <Porofile />
          </PrivateRoute>}></Route>
        </Routes>

      </div>
      <div></div>
    </BrowserRouter>
  );
}

export default App;