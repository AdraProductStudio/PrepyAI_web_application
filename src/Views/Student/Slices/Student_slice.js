import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
        
      return {
        ...state,
        value: state.value + 1,
      };

    case 'DECREMENT':
      return {
        ...state,
        value: state.value - 1,
      };

    case 'RESET':
      return {
        ...state,
        value: 0,
      };

    default:
      return state;
  }
}

export default counterReducer;
