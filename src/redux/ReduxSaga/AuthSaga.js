import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import constants from '../../utils/helpers/constants';
import {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  resendemailSuccess,
  resendemailFailure,
  UserDetailSuccess,
  UserDetailFailure,
  DeviceDetailSuccess,
  DeviceDetailFailure,
  UpdateUserSuccess,
  UpdateUserFailure,
  UpdatePasswordSuccess,
  UpdatePasswordFailure,
  RefreshTokenSuccess,
  RefreshTokenFailure,
  RefreshTokenRequest,
  UserDetailRequest,
  getRefreshTokenSuccess,
  UpdateUserRequest,
  UpdatePasswordRequest,
  DeviceDetailRequest,
  UpdateEmailSuccess,
  UpdateEmailFailure,
  UpdateEmailRequest,
} from '../Reducer/AuthReducer';

import Toast from '../../utils/helpers/Toast';
import {
  getApiGeneral,
  postApi,
  postApiGeneral,
  putApiGeneral,
} from '../../utils/helpers/ApiRequest';
let getItem = state => state.AuthReducer;
let token = '';

///tokenSaga

export function* gettokenSaga() {
  try {
    const response = yield call(AsyncStorage?.getItem, constants?.TOKEN);
    const response1 = yield call(
      AsyncStorage?.getItem,
      constants?.REFRESHTOKEN,
    );
    console.log(response);

    if (response != null) {
      yield put(getTokenSuccess(response));
      yield put(getRefreshTokenSuccess(response1));
    } else {
      yield put(getTokenSuccess(null));
      yield put(getRefreshTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

//country saga

//signupSaga saga

export function* signupSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApiGeneral,
      'user/signup',
      action?.payload,
      header,
    );
    console.log('Signup===========', response);
    if (response?.status == 200) {
      yield put(signupSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(signupFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(signupFailure(error));
    // Toast(
    //   error?.response?.data?.message == 'Validation Error.'
    //     ? error?.response?.data?.data?.email[0]
    //     : error?.response?.data?.message,
    // );
    Toast(error?.response?.data?.message);
  }
}

//login saga

export function* loginSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApiGeneral,
      'user/signin',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield call(AsyncStorage.setItem, constants.TOKEN, response?.data?.token);
      yield call(
        AsyncStorage.setItem,
        constants.REFRESHTOKEN,
        response?.data?.refresh_token,
      );
      console.log('refresh=====token====', response?.data?.refresh_token);
      yield put(getTokenSuccess(response?.data?.token));
      yield put(getRefreshTokenSuccess(response?.data?.refresh_token));
      yield put(loginSuccess(response?.data?.data));
      Toast('Login Successful');
    } else {
      yield put(loginFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(loginFailure(error));
    Toast(error?.response?.data?.message);
  }
}
//forgot password

////otpverification

///create new password

//logout
export function* logoutSaga() {
  const items = yield select(getItem);
  console.log(items?.getTokenResponse);
  // const header = {
  //   Accept: 'application/json',
  //   contenttype: 'application/json',
  //   accesstoken: items.getTokenResponse,
  // };
  Toast('Logout successfull');

  yield call(AsyncStorage.clear);
  yield put(getTokenSuccess(null));
  yield put(getRefreshTokenSuccess(null));
  //   yield put(logoutSuccess('logout'))
}

export function* forgotpasswordSaga(action) {
  console.log('hi');
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApiGeneral,
      'user/forgot-password',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(forgotpasswordSuccess(response?.data));
      // Toast(response?.data?.message);
    }
    //  else if (response.data.status == 403) {
    //     yield put(signupSuccess(response.data));
    //     // Toast(response.data.message);
    //   }
    else {
      yield put(forgotpasswordFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(forgotpasswordFailure(error));
    Toast(error?.response?.data?.message);
  }
}
export function* resendEmailSaga(action) {
  console.log('hi');
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApiGeneral,
      'user/resend-email-verification-code',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(resendemailSuccess(response?.data));
      Toast(response?.data?.message);
    }
    //  else if (response.data.status == 403) {
    //     yield put(signupSuccess(response.data));
    //     // Toast(response.data.message);
    //   }
    else {
      yield put(resendemailFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(resendemailFailure(error));
    Toast(error?.response?.data?.message);
  }
}

export function* UserDetailSaga() {
  let item = yield select(getItem);
  console.log('++++++++', item);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item?.getTokenResponse,
  };

  try {
    let response = yield call(getApiGeneral, 'user/details', header);
    console.log('Get User Response', response);
    if (response?.status == 200) {
      yield put(UserDetailSuccess(response?.data));
      // Toast(response?.data?.message)
    } else {
      yield put(UserDetailFailure(response?.data));
      // Toast(response?.data?.message)
    }
  } catch (error) {
    console.log('Get User Error', error);

    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest({
          refresh: {
            refresh_token: item?.getRefreshTokenResponse,
          },
          recall: 'UserDetailSaga',
        }),
      );
    } else {
      yield put(UserDetailFailure(error?.response?.data));
      Toast(error?.response?.data?.message);
    }
  }
}

export function* DeviceDetailsSaga(action) {
  let item = yield select(getItem);
  console.log('++++++++', item);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item?.getTokenResponse,
  };
  try {
    let response = yield call(
      postApiGeneral,
      'device-master/submit',
      action.payload,
      header,
    );
    console.log('Get User Response', response);
    if (response?.status == 200) {
      yield put(DeviceDetailSuccess(response?.data));
      //Toast(response?.data?.message)
    } else {
      yield put(DeviceDetailFailure(response?.data));
      //Toast(response?.data?.message)
    }
  } catch (error) {
    console.log('Get User Error', error);
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest({
          refresh: {
            refresh_token: item?.getRefreshTokenResponse,
          },
          recall: 'DeviceDetailsSaga',
          argument: action.payload,
        }),
      );
    } else {
      yield put(DeviceDetailFailure(error));
    }
    //Toast(error?.response?.data?.message);
  }
}

export function* UpdateDetailSaga(action) {
  let item = yield select(getItem);
  console.log('++++++++', item);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item?.getTokenResponse,
  };
  try {
    let response = yield call(
      putApiGeneral,
      'user/update-profile',
      action.payload,
      header,
    );
    console.log('Update User Response', response);
    if (response?.status == 200) {
      yield put(UpdateUserSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(UpdateUserFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log('Update User Error', error);
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest({
          refresh: {
            refresh_token: item?.getRefreshTokenResponse,
          },
          recall: 'UpdateDetailSaga',
          argument: action.payload,
        }),
      );
    } else {
      yield put(UpdateUserFailure(error));
      Toast(error?.response?.data?.message);
    }
  }
}
export function* UpdatePasswordSaga(action) {
  let item = yield select(getItem);
  console.log('++++++++', item);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item?.getTokenResponse,
  };
  try {
    let response = yield call(
      putApiGeneral,
      'user/update-password',
      action.payload,
      header,
    );
    console.log('Update User Response', response);
    if (response?.status == 200) {
      yield put(UpdatePasswordSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(UpdatePasswordFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest({
          refresh: {
            refresh_token: item?.getRefreshTokenResponse,
          },
          recall: 'UpdatePasswordSaga',
          argument: action.payload,
        }),
      );
    } else {
      yield put(UpdatePasswordFailure(error));
    }
    //Toast(error?.response?.data?.message);
  }
}
export function* UpdateEmailSaga(action) {
  let item = yield select(getItem);
  console.log('++++++++', item);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: item?.getTokenResponse,
  };
  try {
    let response = yield call(
      putApiGeneral,
      'user/update-email',
      action.payload,
      header,
    );
    console.log('Update Email Response', response);
    if (response?.status == 200) {
      yield put(UpdateEmailSuccess(response?.data));
      // Toast(response?.data?.message);
    } else {
      yield put(UpdateEmailFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest({
          refresh: {
            refresh_token: item?.getRefreshTokenResponse,
          },
          recall: 'UpdateEmailSaga',
          argument: action.payload,
        }),
      );
    } else {
      yield put(UpdateEmailFailure(error));
    }
    //Toast(error?.response?.data?.message);
  }
}

export function* RefreshToken(action) {
  let item = yield select(getItem);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // accesstoken: item?.getTokenResponse,
  };
  console.log('+++++++++++++, Hello Refresh');
  try {
    let response = yield call(
      postApiGeneral,
      'user/refreshtoken',
      action.payload.refresh,
      header,
    );
    console.log('refresh Response', response);
    if (response?.status == 200) {
      yield put(getTokenSuccess(response?.data?.data?.token));
      yield put(getRefreshTokenSuccess(response?.data?.data?.refresh_token));
      // Toast(response?.data?.message);
      // yield call(AsyncStorage.setItem, constants.TOKEN, response?.data?.token);
      // yield call(
      //   AsyncStorage.setItem,
      //   constants.REFRESHTOKEN,
      //   response?.data?.refresh_token,
      // );
      yield call(AsyncStorage.multiSet, [
        [constants.TOKEN, response?.data?.data?.token],
        [constants.REFRESHTOKEN, response?.data?.data?.refresh_token],
      ]);
      if (action.payload.recall == 'UserDetailSaga') {
        yield put(UserDetailRequest());
      } else if (action.payload.recall == 'UpdateDetailSaga') {
        yield put(UpdateUserRequest(action.payload.argument));
      } else if (action.payload.recall == 'UpdatePasswordSaga') {
        yield put(UpdatePasswordRequest(action.payload.argument));
      } else if (action.payload.recall == 'DeviceDetailsSaga') {
        yield put(DeviceDetailRequest(action.payload.argument));
      } else if (action.payload.recall == 'UpdateEmailSaga') {
        yield put(UpdateEmailRequest(action.payload.argument));
      }
    } else {
      yield put(RefreshTokenFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(RefreshTokenFailure(error));
    //Toast(error?.response?.data?.message);
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest('Auth/signupRequest', signupSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/loginRequest', loginSaga);
  })(),

  (function* () {
    yield takeLatest('Auth/getTokenRequest', gettokenSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/logoutRequest', logoutSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/forgotpasswordRequest', forgotpasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/resendemailRequest', resendEmailSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/UserDetailRequest', UserDetailSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/DeviceDetailRequest', DeviceDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/UpdateUserRequest', UpdateDetailSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/UpdatePasswordRequest', UpdatePasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/UpdateEmailRequest', UpdateEmailSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/RefreshTokenRequest', RefreshToken);
  })(),
];

export default watchFunction;
