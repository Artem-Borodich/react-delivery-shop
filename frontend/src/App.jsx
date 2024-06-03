import React from 'react';
import Restaurant from './Pages/Restaurant';
import Cart from './components/Cart';

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './config';
import { useAppDispatch, useAppSelector } from './store/store';
import { setUser } from './store/features/userSlice';
import { setIsLoggedIn } from './store/features/isLoggedInSlice';
import Header from './components/Header';
import ResOwnerPanel from './Pages/ResOwnerPanel';
import Restaurants from './Pages/Restaurants';

const App = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      axios
        .get(`${baseUrl}/currentUser`, { headers: { authorization: token } })
        .then((response) => {
          const user = response.data;
          let parsedUser = {};
          if (user.role === 'owner') {
            parsedUser = {
              email: user.email,
              name: user.name,
              role: user.role,
              cart: user.cart,
              orders: user.orders,
              id: user._id,
              createdAt: user.createdAt,
              restaurant: user.restaurant,
            };
          } else {
            parsedUser = {
              email: user.email,
              name: user.name,
              role: user.role,
              cart: user.cart,
              orders: user.orders,
              id: user._id,
              createdAt: user.createdAt,
            };
          }
          dispatch(setUser(parsedUser));
        })
        .catch((error) => {
          console.log('Error fetching current user:');
        });
      axios
        .get(`${baseUrl}/checkAuth`, { headers: { authorization: token } })
        .then((response) => {
          const isLoggedInFromResponse = response.data.authenticated;
          dispatch(setIsLoggedIn(isLoggedInFromResponse));
          setIsLoggedInState(isLoggedInFromResponse);
        })
        .catch((error) => {
          console.log('Error fetching authentication:');
        });
    }
  }, [token]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
          element={isLoggedInState ? <Navigate to='/profile' /> : <Login />}
        />
        <Route
          path='/register'
          element={isLoggedInState ? <Navigate to='/profile' /> : <Register />}
        />
        <Route
          path='/profile'
          element={isLoggedInState ? <Profile /> : <Navigate to='/login' />}
        />
        <Route
          path='/my_restaurant'
          element={
            isLoggedInState && user.role === 'owner' ? (
              <ResOwnerPanel />
            ) : (
              <Navigate to='/profile' />
            )
          }
        />
        <Route
          path='/restaurants'
          element={isLoggedInState ? <Restaurants /> : <Navigate to='/login' />}
        />
        <Route
          path='/restaurants/:resId'
          element={isLoggedInState ? <Restaurant /> : <Navigate to='/login' />}
        />
      </Routes>
      <footer></footer>
      {
        isLoggedInState
        ? <Cart/>
        : ''
      }
    </Router>
  );
};

export default App;