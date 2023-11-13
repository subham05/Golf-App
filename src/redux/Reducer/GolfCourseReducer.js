import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  error: null,
  courseTeeList: [],
  courseList: [],
  courseList1: [],
  page_no: 0,
  isLoading: true,
  searchCityListRes: [],
  no_of_holes: [],
  courseDetails: {},
  handicapRoundListRes: {},
  handicapRoundDetailsRes: {},
  deviceCourseDataDetailsPublicRes: {},
  updatedCourseCountRes: {},
  devicefirmwareVersionRes: {},
  roundStatisticsRes: {},
  courseScoreCardListRes: {},
  courseScoreDetailsRes: {},
  numberHoles: null,
  bleStatus: false,
  disconnectDevices: {},
  scannedDevices: [],
  currentPeriferalId: null,
  courseId: '',
  selectedHoleData: [],
  courseNameData: '',
  GuestMemberLoginResponse: {},
};

const GolfCourseSlice = createSlice({
  name: 'GolfCourse',
  initialState: initialState,
  reducers: {
    courseListRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    courseListSuccess(state, action) {
      state.status = action.type;
      state.courseList = action.payload.listData;
      state.searchCityListRes = [];
      state.page_no = action.payload.pageNo;
      state.isLoading = false;
    },
    courseListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    courseListRequest1(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    courseListSuccess1(state, action) {
      state.status = action.type;
      state.courseList = action.payload.listData;
      state.searchCityListRes = [];
      state.page_no = action.payload.pageNo;
      state.isLoading = false;
    },
    courseListFailure1(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    searchcourseListRequest(state, action) {
      state.status = action.type;
      state.isLoading = state.page_no == 0 ? true : false;
    },
    searchcourseListRequest1(state, action) {
      state.status = action.type;
      state.isLoading = state.page_no == 0 ? true : false;
    },
    searchcourseListRequest2(state, action) {
      state.status = action.type;
      state.isLoading = state.page_no == 0 ? true : false;
    },
    searchcourseListSuccess(state, action) {
      state.status = action.type;
      state.courseList1 = action.payload.listData;
      state.page_no = action.payload.pageNo;
      state.isLoading = false;
      // state.courseList =
      //   action.payload.pageNo == 1
      //     ? action.payload.listData
      //     : [...state.courseList, ...action.payload.listData];
    },
    searchcourseListSuccess1(state, action) {
      state.status = action.type;
      state.courseList1 = action.payload.listData;
      state.page_no = action.payload.pageNo;
      state.isLoading = false;
      // state.courseList =
      //   action.payload.pageNo == 1
      //     ? action.payload.listData
      //     : [...state.courseList, ...action.payload.listData];
    },
    searchcourseListSuccess2(state, action) {
      state.status = action.type;
      state.courseList1 = action.payload.listData;
      state.page_no = action.payload.pageNo;
      state.isLoading = false;
      // state.courseList =
      //   action.payload.pageNo == 1
      //     ? action.payload.listData
      //     : [...state.courseList, ...action.payload.listData];
    },
    searchcourseListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    courseTeeListRequest(state, action) {
      state.status = action.type;
    },
    courseTeeListSuccess(state, action) {
      state.status = action.type;
      state.courseTeeList = action.payload;
    },
    courseTeeListFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
    },
    /* SEARCH CITY LIST */
    searchCityListRequest(state, action) {
      state.status = action.type;
      state.isLoading = state.page_no == 0 ? true : false;
    },
    searchCityListSuccess(state, action) {
      state.searchCityListRes = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    searchCityListFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },

    courseDetailsRequest(state, action) {
      state.status = action.type;
    },
    courseDetailsSuccess(state, action) {
      state.status = action.type;
      state.courseDetails = action.payload.details;
      state.no_of_holes = action.payload.no_of_holes;
    },
    courseDetailsFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    deviceCourseDataDetailsPublicRequest(state, action) {
      state.status = action.type;
    },
    deviceCourseDataDetailsPublicSuccess(state, action) {
      state.status = action.type;
      state.deviceCourseDataDetailsPublicRes = action.payload;
    },
    deviceCourseDataDetailsPublicFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    updateCourseRequest(state, action) {
      state.status = action.type;
    },
    updateCourseSuccess(state, action) {
      state.status = action.type;
      state.updateCourseRes = action.payload.details;
    },
    updateCourseFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    handicapRoundListRequest(state, action) {
      // console.log('state.status', action.type);
      state.status = action.type;
    },
    handicapRoundListSuccess(state, action) {
      state.status = action.type;
      state.handicapRoundListRes = action.payload;
    },
    handicapRoundListFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    handicapRoundDetailsRequest(state, action) {
      state.status = action.type;
    },
    handicapRoundDetailsSuccess(state, action) {
      state.status = action.type;
      state.handicapRoundDetailsRes = action.payload;
    },
    handicapRoundDetailsFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    updateCourseCountRequest(state, action) {
      state.status = action.type;
    },
    updateCourseCountSuccess(state, action) {
      state.status = action.type;
      state.updatedCourseCountRes = action.payload;
    },
    updateCourseCountFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    devicefirmwareVersionDetailsRequest(state, action) {
      state.status = action.type;
    },
    devicefirmwareVersionDetailsSuccess(state, action) {
      state.status = action.type;
      state.devicefirmwareVersionRes = action.payload;
    },
    devicefirmwareVersionDetailsFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    roundStatisticsRequest(state, action) {
      state.status = action.type;
    },
    roundStatisticsSuccess(state, action) {
      state.status = action.type;
      state.roundStatisticsRes = action.payload;
    },
    roundStatisticsFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    courseScoreCardListRequest(state, action) {
      state.status = action.type;
    },
    courseScoreCardListSuccess(state, action) {
      state.status = action.type;
      state.courseScoreCardListRes = action.payload;
    },
    courseScoreCardListFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },

    courseScoreDetailsRequest(state, action) {
      state.status = action.type;
    },
    courseScoreDetailsSuccess(state, action) {
      state.status = action.type;
      state.courseScoreDetailsRes = action.payload;
    },
    courseScoreDetailsFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    storeNumberHoles(state, action) {
      state.numberHoles = action.payload;
    },
    setBluetoothStatus(state, action) {
      state.status = action.type;
      state.bleStatus = action.payload;
    },
    getDisconnectedDevice(state, action) {
      state.status = action.type;
      state.disconnectDevices = action.payload;
    },
    storeDeviceVersions(state, action) {
      state.status = action.type;
      state.scannedDevices = action.payload;
    },
    storeCurrentPeriferalID(state, action) {
      state.status = action.type;
      state.currentPeriferalId = action.payload;
    },
    storeCourseId(state, action) {
      state.status = action.type;
      state.courseId = action.payload;
    },
    setSelectedHole(state, action) {
      state.status = action.type;
      state.selectedHoleData = action.payload;
    },
    setCourseName(state, action) {
      state.status = action.type;
      state.courseNameData = action.payload;
    },
    //GuestMemberLogin Reducer
    GuestMemberLoginRequest(state, action) {
      state.status = action.type;
    },
    GuestMemberLoginSuccess(state, action) {
      state.status = action.type;
      state.GuestMemberLoginResponse = action.payload;
    },
    GuestMemberLoginFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
    ReportMappingHolesRequest(state, action) {
      state.status = action.type;
    },
    ReportMappingHolesSuccess(state, action) {
      state.status = action.type;
      state.GuestMemberLoginResponse = action.payload;
    },
    ReportMappingHolesFailure(state, action) {
      state.error = action.payload;
      state.status = action.type;
    },
  },
});

export const {
  courseListRequest,
  courseListSuccess,
  courseListFailure,
  courseTeeListRequest,
  courseTeeListSuccess,
  courseTeeListFailure,
  searchcourseListRequest,
  searchcourseListSuccess,
  searchcourseListFailure,
  searchCityListRequest,
  searchCityListSuccess,
  searchCityListFailure,
  courseDetailsRequest,
  courseDetailsSuccess,
  courseDetailsFailure,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFailure,
  handicapRoundListRequest,
  handicapRoundListSuccess,
  handicapRoundListFailure,
  handicapRoundDetailsRequest,
  handicapRoundDetailsSuccess,
  handicapRoundDetailsFailure,
  deviceCourseDataDetailsPublicRequest,
  deviceCourseDataDetailsPublicSuccess,
  deviceCourseDataDetailsPublicFailure,
  updateCourseCountRequest,
  updateCourseCountSuccess,
  updateCourseCountFailure,
  devicefirmwareVersionDetailsRequest,
  devicefirmwareVersionDetailsSuccess,
  devicefirmwareVersionDetailsFailure,
  roundStatisticsRequest,
  roundStatisticsSuccess,
  roundStatisticsFailure,
  courseScoreCardListRequest,
  courseScoreCardListSuccess,
  courseScoreCardListFailure,
  courseScoreDetailsRequest,
  courseScoreDetailsSuccess,
  courseScoreDetailsFailure,
  storeNumberHoles,
  setBluetoothStatus,
  getDisconnectedDevice,
  storeDeviceVersions,
  storeCurrentPeriferalID,
  storeCourseId,
  setSelectedHole,
  setCourseName,
  GuestMemberLoginFailure,
  GuestMemberLoginRequest,
  GuestMemberLoginSuccess,
  ReportMappingHolesRequest,
  ReportMappingHolesSuccess,
  ReportMappingHolesFailure,

  searchcourseListSuccess1,
  searchcourseListRequest1,
  searchcourseListSuccess2,
  searchcourseListRequest2,
  courseListRequest1,
  courseListSuccess1,
  courseListFailure1,
} = GolfCourseSlice.actions;
export default GolfCourseSlice.reducer;
