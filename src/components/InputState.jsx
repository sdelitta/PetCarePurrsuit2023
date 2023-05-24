import React, { createContext, useContext, useReducer } from 'react';

export const InputContext = createContext();

const initialInputState = {
  zip: '',
  animal: '',
  size: '',
  age: ''
  // add more fields here
};

function inputReducer(state, action) {
  switch (action.type) {
    case 'SET_ZIP':
      return { ...state, zip: action.payload };
    case 'SET_ANIMAL':
      return { ...state, animal: action.payload };
    case 'SET_SIZE':
        return { ...state, size: action.payload}
    case 'SET_AGE':
        return { ...state, age: action.payload}
    // add more cases here for other fields
    default:
      return state;
  }
}

export function InputProvider({ children }) {
  const [inputState, inputDispatch] = useReducer(inputReducer, initialInputState);
  return (
    <InputContext.Provider value={{ inputState, inputDispatch }}>
      {children}
    </InputContext.Provider>
  );
}

export function useInput() {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error('useInput must be used within a InputProvider');
  }
  return context;
}