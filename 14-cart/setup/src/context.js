import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE', payload: id });
  }

  function increaseItem(id) {
    dispatch({ type: 'INCREASE', payload: id });
  }

  function decreaseItem(id) {
    dispatch({ type: 'DECREASE', payload: id });
  }

  async function fetchData() {
    dispatch({ type: 'LOADING' });

    const response = await fetch(url);
    const cart = await response.json();

    dispatch({ type: 'DISPLAY_ITEMS', payload: cart });
  }

  function changeAmount(id, type) {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, type } });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        // increaseItem,
        // decreaseItem,
        changeAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
