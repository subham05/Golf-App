import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import GolfCourseReducer from '../Reducer/GolfCourseReducer';
import RootSaga from '../ReduxSaga/rootsaga';
import HomeReducer from '../Reducer/HomeReducer';
import AuthReducer from '../Reducer/AuthReducer';
let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

const store = configureStore({
  reducer: {
    GolfCourseReducer: GolfCourseReducer,
    HomeReducer: HomeReducer,
    AuthReducer: AuthReducer,
  },
  middleware,
});
sagaMiddleware.run(RootSaga);
export default store;
