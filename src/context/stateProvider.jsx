import React, { createContext, useContext, useReducer } from 'react';
export const StateContext = createContext();
export const StateProvider = ({ userReducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(userReducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
