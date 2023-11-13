import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  error: null,
  isLoading: true,
  faqData: {},
  privacypolicyData: {},
  technicalSupportData: {},
  slugData: {},
  reportMappingData: {},
  advanceGreenList: [],
  updatedAdvanceGreenList: [],
};

const HomeSlice = createSlice({
  name: 'Home',
  initialState: initialState,
  reducers: {
    faqRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    faqSuccess(state, action) {
      state.status = action.type;
      state.faqData = action.payload;

      state.isLoading = false;
    },
    faqFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    privacyPolicyRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    privacyPolicySuccess(state, action) {
      state.status = action.type;
      state.privacypolicyData = action.payload;

      state.isLoading = false;
    },
    privacyPolicyFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    technicalSupportRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    technicalSupportSuccess(state, action) {
      state.status = action.type;
      state.technicalSupportData = action.payload;

      state.isLoading = false;
    },
    technicalSupportFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    advanceGreenListRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    advanceGreenListSuccess(state, action) {
      state.status = action.type;
      // console.log('advanceGreenList action', action.payload);
      state.advanceGreenList = action.payload;
      state.isLoading = false;
    },
    advanceGreenListFailure(state, action) {
      state.status = action.type;
      state.advanceGreenList = action.payload;
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteAdvanceGreenListItemRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    deleteAdvanceGreenListItemSuccess(state, action) {
      state.status = action.type;
      // console.log('deleteAdvanceGreenListItemSuccess action', action.payload);
      state.updatedAdvanceGreenList = action.payload;
      state.isLoading = false;
    },
    deleteAdvanceGreenListItemFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },

    addeGreenListRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    addGreenListSuccess(state, action) {
      state.status = action.type;
      // console.log('addGreenList action', action.payload);
      // state.advanceGreenList = action.payload;
      state.isLoading = false;
    },
    addGreenListFailure(state, action) {
      state.status = action.type;
      // state.advanceGreenList = action.payload;
      state.error = action.payload;
      state.isLoading = false;
    },
    reportMappingRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    reportMappingSuccess(state, action) {
      state.status = action.type;
      state.reportMappingData = action.payload;
      state.isLoading = false;
    },
    reportMappingFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    slugRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    slugSuccess(state, action) {
      state.status = action.type;
      state.slugData = action.payload;
      state.isLoading = false;
    },
    slugFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.isLoading = false;
    },
    RefreshTokenRequest1(state, action) {
      state.status = action.type;
    },
    RefreshTokenFailure1(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  faqRequest,
  faqSuccess,
  faqFailure,
  privacyPolicyRequest,
  privacyPolicySuccess,
  privacyPolicyFailure,
  technicalSupportRequest,
  technicalSupportSuccess,
  technicalSupportFailure,
  slugRequest,
  slugSuccess,
  slugFailure,
  reportMappingRequest,
  reportMappingSuccess,
  reportMappingFailure,
  advanceGreenListFailure,
  advanceGreenListSuccess,
  advanceGreenListRequest,
  deleteAdvanceGreenListItemFailure,
  deleteAdvanceGreenListItemRequest,
  deleteAdvanceGreenListItemSuccess,
  addGreenListFailure,
  addGreenListSuccess,
  addeGreenListRequest,
  RefreshTokenRequest1,
  RefreshTokenFailure1,
} = HomeSlice.actions;
export default HomeSlice.reducer;

