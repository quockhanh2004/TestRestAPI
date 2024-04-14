import {configureStore} from '@reduxjs/toolkit';
// import loginReducer from '../reducers/LoginSlice';
import registerReducer from '../redux/register_reducer';

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});
