import {all} from 'redux-saga/effects';
import GolfCourseSaga from './GolfCourseSaga';
import HomeSaga from './HomeSaga';
import AuthSaga from './AuthSaga';
const combinedSaga = [...GolfCourseSaga, ...HomeSaga, ...AuthSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
