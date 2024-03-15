import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default commonSlice;
