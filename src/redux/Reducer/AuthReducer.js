import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  error: null,
  isLoading: true,
  signupResponse: {},
  loginResponse: {},
  getTokenResponse: null,
  getRefreshTokenResponse: null,
  forgotpasswordResponse: {},
  resendemailResponse: {},
  isSkip: false,
  userDetailsResponse: {},
  DeviceDetailResponse: {},
  UpdateUserDetailResponse: {},
  UpdatPasswordResponse: {},
  UpdatEmailResponse: {},
  count: 0,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    setStatusNull(state) {
      state.status = '';
    },
    signupRequest(state, action) {
      state.status = action.type;
    },
    signupSuccess(state, action) {
      state.signupResponse = action.payload;
      state.status = action.type;
    },
    signupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    getTokenRequest(state, action) {
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.isLoading = false;
      state.getTokenResponse = action.payload;

      state.status = action.type;
    },
    getRefreshTokenSuccess(state, action) {
      state.isLoading = false;

      state.getRefreshTokenResponse = action.payload;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.loginResponse = action.payload;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    forgotpasswordRequest(state, action) {
      state.status = action.type;
    },
    forgotpasswordSuccess(state, action) {
      state.forgotpasswordResponse = action.payload;
      state.status = action.type;
    },
    forgotpasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    resendemailRequest(state, action) {
      state.status = action.type;
    },
    resendemailSuccess(state, action) {
      state.resendemailResponse = action.payload;
      state.status = action.type;
    },
    resendemailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    SkipButtonPress(state, action) {
      state.status = action.type,
      state.isSkip = action.payload;
    },
    UserDetailRequest(state, action) {
      state.status = action.type;
    },
    UserDetailSuccess(state, action) {
      state.status = action.type;
      state.userDetailsResponse = action.payload;
    },
    UserDetailFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
    DeviceDetailRequest(state, action) {
      state.status = action.type;
    },
    DeviceDetailSuccess(state, action) {
      state.status = action.type;
      state.DeviceDetailResponse = action.payload;
    },
    DeviceDetailFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
    UpdateUserRequest(state, action) {
      state.status = action.type;
    },
    UpdateUserSuccess(state, action) {
      state.status = action.type;
      state.UpdateUserDetailResponse = action.payload;
    },
    UpdateUserFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
    UpdatePasswordRequest(state, action) {
      state.status = action.type;
    },
    UpdatePasswordSuccess(state, action) {
      state.status = action.type;
      state.UpdatPasswordResponse = action.payload;
    },
    UpdatePasswordFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
    UpdateEmailRequest(state, action) {
      state.status = action.type;
    },
    UpdateEmailSuccess(state, action) {
      state.status = action.type;
      state.UpdatEmailResponse = action.payload;
    },
    UpdateEmailFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
    RefreshTokenRequest(state, action) {
      state.status = action.type;
    },
    RefreshTokenSuccess(state, action) {
      state.isLoading = false;
      state.getTokenResponse = action.payload;

      state.status = action.type;
    },
    RefreshTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    logoutRequest(state, action) {
      state.status = action.status;
    },
    logoutSuccess(state, action) {
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.status = action.type;
    },
    increaseCount(action, state) {
      state.count = action.payload;
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  forgotpasswordRequest,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  resendemailRequest,
  resendemailSuccess,
  resendemailFailure,
  SkipButtonPress,
  UserDetailRequest,
  UserDetailSuccess,
  UserDetailFailure,
  DeviceDetailRequest,
  DeviceDetailSuccess,
  DeviceDetailFailure,
  UpdateUserRequest,
  UpdateUserSuccess,
  UpdateUserFailure,
  UpdatePasswordRequest,
  UpdatePasswordSuccess,
  UpdatePasswordFailure,
  RefreshTokenRequest,
  RefreshTokenSuccess,
  RefreshTokenFailure,
  getRefreshTokenSuccess,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  UpdateEmailRequest,
  UpdateEmailSuccess,
  UpdateEmailFailure,
  increaseCount,
  setStatusNull,
} = AuthSlice.actions;
export default AuthSlice.reducer;
