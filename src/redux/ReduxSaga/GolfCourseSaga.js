import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  courseDetailsFailure,
  courseDetailsSuccess,
  courseListFailure,
  courseListSuccess,
  courseScoreCardListFailure,
  courseScoreCardListSuccess,
  courseScoreDetailsFailure,
  courseScoreDetailsSuccess,
  courseTeeListFailure,
  courseTeeListSuccess,
  deviceCourseDataDetailsPublicFailure,
  deviceCourseDataDetailsPublicSuccess,
  devicefirmwareVersionDetailsFailure,
  devicefirmwareVersionDetailsSuccess,
  handicapRoundDetailsFailure,
  handicapRoundDetailsSuccess,
  handicapRoundListFailure,
  handicapRoundListSuccess,
  roundStatisticsFailure,
  roundStatisticsSuccess,
  searchCityListFailure,
  searchCityListSuccess,
  searchcourseListFailure,
  searchcourseListSuccess,
  updateCourseCountFailure,
  updateCourseCountSuccess,
  updateCourseFailure,
  updateCourseSuccess,
  GuestMemberLoginFailure,
  GuestMemberLoginRequest,
  GuestMemberLoginSuccess,
  ReportMappingHolesSuccess,
  ReportMappingHolesFailure,
  searchcourseListSuccess1,
  searchcourseListSuccess2,
  courseListSuccess1,
  courseListFailure1,
} from '../Reducer/GolfCourseReducer';
import {postApi} from '../../utils/helpers/ApiRequest';
import Toast from '../../utils/helpers/Toast';
// import Realm from 'realm';
const getItem = state => state.AuthReducer;
const GolfCourseReducer = state => state.GolfCourseReducer;

export function* getCourseTeeListSaga(action) {
  //let item = yield select(getItem);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseTeeDetails',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(courseTeeListSuccess(response.data.teesList));
    } else {
      yield put(courseTeeListFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    Toast(error?.message);
    console.log(error);
    yield put(courseTeeListFailure(error));
  }
}

export function* getCourseListSaga(action) {
  let item = yield select(getItem);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseList',
      action.payload,
      obj,
      header,
    );

    if (response.data.Status == 1) {
      console.log('COURSE DATA', response.data);
      let listData = response.data.courseList;
      // let listData = [
      //   ...(action.payload.page > 1 ? item.courseList : []),
      //   ...(response.data.courseList.length == 0
      //     ? []
      //     : response.data.courseList),
      // ];

      let pageNo = action.payload.page;
      // response.data.courseList.length > 0
      //   ? action.payload.page
      //   : item.page_no;
      yield put(courseListSuccess({listData, pageNo}));
    } else {
      yield put(courseListFailure(response.data));
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(courseListFailure(error));
  }
}

export function* getCourseListSaga1(action) {
  let item = yield select(getItem);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseList',
      action.payload,
      obj,
      header,
    );

    if (response.data.Status == 1) {
      console.log('COURSE DATA', response.data);
      let listData = response.data.courseList;
      // let listData = [
      //   ...(action.payload.page > 1 ? item.courseList : []),
      //   ...(response.data.courseList.length == 0
      //     ? []
      //     : response.data.courseList),
      // ];

      let pageNo = action.payload.page;
      // response.data.courseList.length > 0
      //   ? action.payload.page
      //   : item.page_no;
      yield put(courseListSuccess1({listData, pageNo}));
    } else {
      yield put(courseListFailure1(response.data));
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    yield put(courseListFailure1(error));
  }
}

export function* getSearchCourseListSaga(action) {
  let item = yield select(GolfCourseReducer);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseList',
      action.payload,
      obj,
      header,
    );
    if (response.data.Status == 1) {
      let listData = response.data.courseList;

      // let listData = [
      //   ...(action.payload.page > 1 ? item.courseList : []),
      //   ...(response.data.courseList.length == 0
      //     ? []
      //     : response.data.courseList),
      // ];+
      console.log('pageNo', action.payload.page);

      let pageNo = action.payload.page;
      // response.data.courseList.length > 0
      //   ? action.payload.page
      //   : item.page_no;
      yield put(searchcourseListSuccess({listData, pageNo}));
    } else {
      yield put(searchcourseListFailure(response.data));
      console.log(response.data.ErrorMessage);
    }
  } catch (error) {
    console.log(error);
    yield put(searchcourseListFailure(error));
  }
}
export function* getSearchCourseListSaga1(action) {
  let item = yield select(GolfCourseReducer);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseList',
      action.payload,
      obj,
      header,
    );
    if (response.data.Status == 1) {
      let listData = response.data.courseList;

      // let listData = [
      //   ...(action.payload.page > 1 ? item.courseList : []),
      //   ...(response.data.courseList.length == 0
      //     ? []
      //     : response.data.courseList),
      // ];+
      console.log('pageNo', action.payload.page);

      let pageNo = action.payload.page;
      // response.data.courseList.length > 0
      //   ? action.payload.page
      //   : item.page_no;
      yield put(searchcourseListSuccess1({listData, pageNo}));
    } else {
      yield put(searchcourseListFailure(response.data));
      console.log(response.data.ErrorMessage);
    }
  } catch (error) {
    console.log(error);
    yield put(searchcourseListFailure(error));
  }
}
export function* getSearchCourseListSaga2(action) {
  let item = yield select(GolfCourseReducer);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseList',
      action.payload,
      obj,
      header,
    );
    if (response.data.Status == 1) {
      let listData = response.data.courseList;

      // let listData = [
      //   ...(action.payload.page > 1 ? item.courseList : []),
      //   ...(response.data.courseList.length == 0
      //     ? []
      //     : response.data.courseList),
      // ];+
      console.log('pageNo', action.payload.page);

      let pageNo = action.payload.page;
      // response.data.courseList.length > 0
      //   ? action.payload.page
      //   : item.page_no;
      yield put(searchcourseListSuccess2({listData, pageNo}));
    } else {
      yield put(searchcourseListFailure(response.data));
      console.log(response.data.ErrorMessage);
    }
  } catch (error) {
    console.log(error);
    yield put(searchcourseListFailure(error));
  }
}
export function* searchCityListSaga(action) {
  // let item = yield select(getItem);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CitySearch',
      action.payload,
      obj,
      header,
    );
    console.log('Response data: ', response.data);
    if (response.data.Status == 1) {
      yield put(searchCityListSuccess(response.data.cityList));
      //Keyboard.dismiss();
    } else {
      yield put(searchCityListFailure(response.data.ErrorMessage));
    }
  } catch (error) {
    console.log(error);
    yield put(searchCityListFailure(error));
  }
}

export function* courseDetailsSaga(action) {
  // let item = yield select(getItem);

  let obj = {
    email: '',
    userkey: '',
  };

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseDetails',
      action.payload,
      obj,
      header,
    );
    console.log('Response data: ', response.data.layoutHoles);
    if (response.data.Status == 1) {
      let details = response.data;
      let i = 1;
      let no_of_holes = [];

      while (i <= response.data.layoutHoles) {
        no_of_holes.push(i);
        i++;
      }

      yield put(courseDetailsSuccess({details, no_of_holes}));
    } else {
      yield put(courseDetailsFailure(response.data.ErrorMessage));
    }
  } catch (error) {
    console.log(error);
    yield put(courseDetailsFailure(error));
  }
}

// export function* GuestMemberLoginSaga(action) {
//   // let item = yield select(getItem);

//   let header = {
//     Accept: 'application/json',
//     contenttype: 'application/json',
//   };

//   try {
//     let response = yield call(postApi, 'GuestMemberLogin', action.payload);
//     if (response.data.Status == 1) {
//       let details = response.data;
//       console.log('GuestMemberLogin details', details);
//       yield put(GuestMemberLoginSuccess({details, no_of_holes}));
//     } else {
//       yield put(GuestMemberLoginFailure(response.data.ErrorMessage));
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(GuestMemberLoginFailure(error));
//   }
// }

// Guest Member Login Saga
export function* GuestMemberLoginSaga(action) {
  // let item = yield select(getItems);
  // let realm;
  // realm = new Realm({path: 'UPDATE_COURSE.realm'});

  let obj = {
    email: '',
    userkey: '',
  };
  console.log('action.payload', action.payload);
  console.log('obj', obj);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'GuestMemberLogin',
      action.payload,
      obj,
      header,
    );
    console.log('GuestMemberLogin response', response);
    if (response.data.Status) {
    }
    if (response.data.Status == 1) {
      console.log('GuestMemberLogin details', response.data);
      // yield put(memberUpdateSuccess(response.data));
    } else {
      yield put(GuestMemberLoginFailure(response.data.ErrorMessage));
    }
  } catch (error) {
    console.log(error);
    yield put(GuestMemberLoginFailure(error));
  }
}

export function* upDateCourseSaga(action) {
  let item = yield select(getItem);
  let realm;
  realm = new Realm({path: 'UPDATE_COURSE.realm'});

  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    // yield delay;
    // realm.write(() => {
    //   realm.create('update_course', {
    //     id_course: action.payload.id_course,
    //     success: false,
    //   });
    // });
    // yield put(updateCourseSuccess('data'));
    let response = yield call(
      postApi,
      'DeviceCourseDataDetails',
      action.payload,
      obj,
      header,
    );
    console.log('Response data: ', JSON.stringify(response.data));
    if (response.data.Status == 1) {
      realm.write(() => {
        realm.create('update_course', {
          id_course: action.payload.id_course,
          success: true,
        });
      });
      yield put(updateCourseSuccess(response.data));
    } else {
      realm.write(() => {
        realm.create('update_course', {
          id_course: action.payload.id_course,
          success: false,
        });
      });
      yield put(updateCourseFailure(response.data.ErrorMessage));
    }
  } catch (error) {
    console.log(JSON.stringify(error.response.data));
    realm.write(() => {
      realm.create('update_course', {
        id_course: action.payload.id_course,
        success: false,
      });
    });
    yield put(updateCourseFailure(error));
  }
}

export function* getHandicapRoundListSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'HandicapRoundList',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(handicapRoundListSuccess(response.data));
    } else {
      yield put(handicapRoundListFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(handicapRoundListFailure(error));
  }
}

export function* getHandicapRoundDetailsSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'HandicapRoundDetails',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(handicapRoundDetailsSuccess(response.data));
    } else {
      yield put(handicapRoundDetailsFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    // Toast(error?.message);
    console.log(error);
    yield put(handicapRoundDetailsFailure(error));
  }
}

export function* getCourseScoreDetailsSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseScorecardDetails',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(courseScoreDetailsSuccess(response.data));
    } else {
      yield put(courseScoreDetailsFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    // Toast(error?.message);
    console.log(error);
    yield put(courseScoreDetailsFailure(error));
  }
}

export function* deviceCourseDataDetailsPublicSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: '',
    userkey: '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'DeviceCourseDataDetailsPublic',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(deviceCourseDataDetailsPublicSuccess(response.data));
    } else {
      yield put(deviceCourseDataDetailsPublicFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(deviceCourseDataDetailsPublicFailure(error));
  }
}

export function* updateCourseCountSaga(action) {
  let item = yield select(getItem);
  let obj = {
    // email: item?.email ? item.email + '/' : '',
    // userkey: item?.user_secretKey ? item.user_secretKey : '',
    email: '',
    userkey: '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseSyncIndexRestorePublic',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', JSON.stringify(response.data));
    if (response.data.Status == 1) {
      yield put(updateCourseCountSuccess(response.data));
    } else {
      yield put(updateCourseCountFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(updateCourseCountFailure(error));
  }
}

export function* devicefirmwareVersionDetailsSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'ProductFirmwareVersionDetails',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(devicefirmwareVersionDetailsSuccess(response?.data));
    } else {
      yield put(devicefirmwareVersionDetailsFailure(response?.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(devicefirmwareVersionDetailsFailure(error));
  }
}

export function* roundStatisticsSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'HandicapStatisticDetails',
      {},
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(roundStatisticsSuccess(response.data));
    } else {
      yield put(roundStatisticsFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(roundStatisticsFailure(error));
  }
}

export function* courseScoreCardListSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'CourseScorecardList',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(courseScoreCardListSuccess(response.data));
    } else {
      yield put(courseScoreCardListFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(courseScoreCardListFailure(error));
  }
}

export function* ReportMappingHolesSaga(action) {
  let item = yield select(getItem);
  let obj = {
    email: item?.email ? item.email + '/' : '',
    userkey: item?.user_secretKey ? item.user_secretKey : '',
  };
  console.log('obj', obj);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'MappingSupportCreate',
      action.payload,
      obj,
      header,
    );
    console.log('response : ', response);
    if (response.data.Status == 1) {
      yield put(ReportMappingHolesSuccess(response.data));
    } else {
      yield put(ReportMappingHolesFailure(response.data));
      //Toast(response.data.ErrorMessage);
    }
  } catch (error) {
    //Toast(error?.message);
    console.log(error);
    yield put(ReportMappingHolesFailure(error));
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest('GolfCourse/courseTeeListRequest', getCourseTeeListSaga);
  })(),
  (function* () {
    yield takeLatest('GolfCourse/courseListRequest', getCourseListSaga);
  })(),
  (function* () {
    yield takeLatest('GolfCourse/courseListRequest1', getCourseListSaga1);
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/searchcourseListRequest',
      getSearchCourseListSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/searchcourseListRequest1',
      getSearchCourseListSaga1,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/searchcourseListRequest2',
      getSearchCourseListSaga2,
    );
  })(),
  (function* () {
    yield takeLatest('GolfCourse/searchCityListRequest', searchCityListSaga);
  })(),
  (function* () {
    yield takeLatest('GolfCourse/courseDetailsRequest', courseDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('GolfCourse/updateCourseRequest', upDateCourseSaga);
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/handicapRoundListRequest',
      getHandicapRoundListSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/handicapRoundDetailsRequest',
      getHandicapRoundDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/courseScoreDetailsRequest',
      getCourseScoreDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/deviceCourseDataDetailsPublicRequest',
      deviceCourseDataDetailsPublicSaga,
    );
  })(),
  (function* () {
    yield takeLatest('GolfCourse/courseListRequest1', getCourseListSaga1);
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/updateCourseCountRequest',
      updateCourseCountSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/devicefirmwareVersionDetailsRequest',
      devicefirmwareVersionDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('GolfCourse/roundStatisticsRequest', roundStatisticsSaga);
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/courseScoreCardListRequest',
      courseScoreCardListSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/GuestMemberLoginRequest',
      GuestMemberLoginSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'GolfCourse/ReportMappingHolesRequest',
      ReportMappingHolesSaga,
    );
  })(),
];

export default watchFunction;
