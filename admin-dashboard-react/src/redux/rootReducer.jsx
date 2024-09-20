import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import customizationReducer from './customizationReducer';

const rootReducer = combineReducers({
  userReducer,
  customization: customizationReducer
  // Add other reducers here if you have more slices
});

export default rootReducer;
