import {
  useState,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from 'react';

import '../components/data';
import { cartReducer } from '../utils/reducers/cartReducers';
const CartContext = createContext();
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // if any change happen on the cart tthis function will be called
  useEffect(() => {
    dispatch({ type: 'UPDATE_TOTAL' });
  }, [state.cart]);
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };
  const increaseItem = (item) => {
    dispatch({ type: 'INCREASE_ITEM', payload: item });
  };
  const decreaseItem = (item) => {
    dispatch({ type: 'DECREASE_ITEM', payload: item });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        clearCart,
        addToCart,
        removeItem,
        increaseItem,
        decreaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// consumer function
const useCartGLobalContext = () => {
  return useContext(CartContext);
};

export { CartProvider, CartContext, useCartGLobalContext };
