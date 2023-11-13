import {call, put, select, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteApiGeneral,
  getApiGeneral,
  postApi,
  postApiGeneral,
} from '../../utils/helpers/ApiRequest';
import Toast from '../../utils/helpers/Toast';
import {
  faqFailure,
  faqSuccess,
  privacyPolicyFailure,
  privacyPolicySuccess,
  reportMappingFailure,
  reportMappingSuccess,
  slugFailure,
  slugSuccess,
  technicalSupportFailure,
  technicalSupportSuccess,
  advanceGreenListFailure,
  advanceGreenListSuccess,
  deleteAdvanceGreenListItemFailure,
  deleteAdvanceGreenListItemRequest,
  deleteAdvanceGreenListItemSuccess,
  addGreenListFailure,
  addGreenListSuccess,
  addeGreenListRequest,
  RefreshTokenRequest1,
  advanceGreenListRequest,
  reportMappingRequest,
} from '../Reducer/HomeReducer';
import {
  RefreshTokenFailure,
  RefreshTokenRequest,
  getRefreshTokenSuccess,
  getTokenSuccess,
} from '../Reducer/AuthReducer';
import constants from '../../utils/helpers/constants';
// import Realm from 'realm';
const getItem = state => state.AuthReducer;
export function* getFaq(action) {
  //   const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApiGeneral, 'faq/list', header);
    console.log('----response', response);
    if (response?.status == 200) {
      yield put(faqSuccess(response?.data?.data));
    } else {
      yield put(faqFailure(response?.data));
    }
  } catch (error) {
    yield put(faqFailure(error));
  }
}
export function* privacyPolicy(action) {
  //   const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApiGeneral, 'privacy-policy/details', header);
    console.log('----response', response?.data?.data);
    if (response?.status == 200) {
      yield put(privacyPolicySuccess(response?.data?.data));
    } else {
      yield put(privacyPolicyFailure(response?.data));
    }
  } catch (error) {
    yield put(privacyPolicyFailure(error));
  }
}
export function* technicalSupport(action) {
  //   const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApiGeneral,
      'technical-support/details',
      header,
    );
    console.log('----response', response?.data?.data);
    if (response?.status == 200) {
      yield put(technicalSupportSuccess(response?.data?.data));
    } else {
      yield put(technicalSupportFailure(response?.data));
    }
  } catch (error) {
    yield put(technicalSupportFailure(error));
  }
}
export function* slugfunction(action) {
  //   const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApiGeneral,
      `cms/details/${action.payload}`,
      header,
    );
    console.log('----response', response?.data?.data);
    if (response?.status == 200) {
      yield put(slugSuccess(response?.data?.data));
    } else {
      yield put(slugFailure(response?.data));
    }
  } catch (error) {
    yield put(slugFailure(error));
  }
}
export function* reportMapping(action) {
  const items = yield select(getItem);
  console.log('TOKEN', items);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.getTokenResponse,
  };
  try {
    let response = yield call(
      postApiGeneral,
      'map-report/submit',
      action?.payload,
      header,
    );
    console.log('report===========', response);
    if (response?.status == 200) {
      yield put(reportMappingSuccess(response?.data));
      Toast('Report Submitted Successfully');
    } else {
      yield put(reportMappingFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest1({
          refresh: {
            refresh_token: items?.getRefreshTokenResponse,
          },
          recall: 'reportMapping',
          argument: action.payload,
        }),
      );
    } else {
      yield put(reportMappingFailure(error));
      // Toast(
      //   error?.response?.data?.message == 'Validation Error.'
      //     ? error?.response?.data?.data?.email[0]
      //     : error?.response?.data?.message,
      // );
      Toast('Some Thing went Wrong');
    }
  }
}
export function* advanceGreenListfunction() {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.getTokenResponse,
  };
  try {
    let response = yield call(postApiGeneral, `advance-green/list`, {}, header);
    console.log('green display response', response);
    if (response?.status == 200) {
      yield put(advanceGreenListSuccess(response?.data?.data));
    } else {
      yield put(advanceGreenListFailure(response?.data));
    }
  } catch (error) {
    console.log('advanceGreenListFailure error', error);
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest1({
          refresh: {
            refresh_token: items?.getRefreshTokenResponse,
          },
          recall: 'advanceGreenListfunction',
        }),
      );
    } else {
      yield put(advanceGreenListFailure(error));
    }
  }
}
export function* addGreenListfunction(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.getTokenResponse,
  };
  try {
    let response = yield call(
      postApiGeneral,
      `advance-green/add`,
      action.payload,
      header,
    );
    console.log('green display response', response);
    if (response?.status == 200) {
      yield put(addGreenListSuccess(response?.data?.data));
      Toast('Course added Successfully');
    } else {
      yield put(addGreenListFailure(response?.data));
    }
  } catch (error) {
    console.log('addGreenListFailure error', error);
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest1({
          refresh: {
            refresh_token: items?.getRefreshTokenResponse,
          },
          recall: 'addGreenListfunction',
          argument: action.payload,
        }),
      );
    } else {
      yield put(addGreenListFailure(error));
    }
  }
}
export function* deleteAdvanceGreenListfunction(action) {
  const items = yield select(getItem);
  console.log('++++', items?.getTokenResponse);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.getTokenResponse,
  };
  try {
    let response = yield call(
      deleteApiGeneral,
      `advance-green/delete/${action.payload}`,
      header,
    );

    console.log(
      'Delete deleteAdvanceGreenListfunction===',
      response,
      action.payload,
    );
    if (response?.status == 200) {
      yield put(deleteAdvanceGreenListItemSuccess(response?.data));
      Toast('Deleted Successfully');
    } else {
      yield put(deleteAdvanceGreenListItemFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.error?.token_expire == true) {
      console.log('entering=======');
      yield put(
        RefreshTokenRequest1({
          refresh: {
            refresh_token: items?.getRefreshTokenResponse,
          },
          recall: 'deleteAdvanceGreenListfunction',
          argument: action.payload,
        }),
      );
    } else {
      yield put(deleteAdvanceGreenListItemFailure(error));
      // Toast(
      //   error?.response?.data?.message == 'Validation Error.'
      //     ? error?.response?.data?.data?.email[0]
      //     : error?.response?.data?.message,
      // );
      Toast('Some Thing went Wrong');
    }
  }
}
export function* RefreshToken1(action) {
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
      if (action.payload.recall == 'advanceGreenListfunction') {
        yield put(advanceGreenListRequest());
      } else if (action.payload.recall == 'addGreenListfunction') {
        console.log('argument1', action.payload.argument);
        yield put(addeGreenListRequest(action.payload.argument));
      } else if (action.payload.recall == 'deleteAdvanceGreenListfunction') {
        console.log('argument2', typeof action.payload.argument);
        yield put(deleteAdvanceGreenListItemRequest(action.payload.argument));
      } else if (action.payload.recall == 'reportMapping') {
        yield put(reportMappingRequest(action.payload.argument));
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
    yield takeLatest('Home/faqRequest', getFaq);
  })(),
  (function* () {
    yield takeLatest('Home/privacyPolicyRequest', privacyPolicy);
  })(),
  (function* () {
    yield takeLatest('Home/technicalSupportRequest', technicalSupport);
  })(),
  (function* () {
    yield takeLatest('Home/slugRequest', slugfunction);
  })(),
  (function* () {
    yield takeLatest('Home/reportMappingRequest', reportMapping);
  })(),
  (function* () {
    yield takeLatest('Home/advanceGreenListRequest', advanceGreenListfunction);
  })(),
  (function* () {
    yield takeLatest('Home/addeGreenListRequest', addGreenListfunction);
  })(),
  (function* () {
    yield takeLatest(
      'Home/deleteAdvanceGreenListItemRequest',
      deleteAdvanceGreenListfunction,
    );
  })(),
  (function* () {
    yield takeLatest('Home/RefreshTokenRequest1', RefreshToken1);
  })(),
];

export default watchFunction;

