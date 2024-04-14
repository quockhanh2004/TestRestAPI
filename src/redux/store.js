import {configureStore} from '@reduxjs/toolkit';
import registerReducer from '../redux/register_reducer';
import getMethodReducer from './getMethod_reducer';
import postMethodReducer from './postMethod_reducer';
import deleteMethodReducer from './deleteMethod_reducer';
import putMethodReducer from './putMethod_reducer';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    getMethod: getMethodReducer,
    postMethod: postMethodReducer,
    deleteMethod: deleteMethodReducer,
    putMethod: putMethodReducer,
  },
});
