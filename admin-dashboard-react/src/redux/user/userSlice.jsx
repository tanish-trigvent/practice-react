import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: null
  },
  reducers: {
    // eslint-disable-next-line no-param-reassign
    loggedInUser: (state, action) => ({
      ...state,
      user: action.payload
    }),
    // eslint-disable-next-line no-param-reassign
    userLogout: (state) => ({
      ...state,
      user: null
    }),
    email: (state, action) => ({
      ...state,
      emailId: action.payload
    }),
    resetPasswordToken: (state, action) => ({
      ...state,
      token: action.payload
    }),
    passwordChanged: (state, action) => ({
      ...state,
      token: null,
      emailId: null
    })
  }
});
// Action creators
export const { loggedInUser, userLogout, email, resetPasswordToken, passwordChanged } = userSlice.actions;
export default userSlice.reducer;
