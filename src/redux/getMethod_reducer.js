import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AxiosInstance from '../AxiosInstance';

export const getMethod = createAsyncThunk(
  '/getMethod',
  async (data, thunkAPI) => {
    try {
      console.log('link >>> ' + data);
      const response = await AxiosInstance().get(data);
      console.log('response >>> ' + response);
      if (response.error) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const methodSlice = createSlice({
  name: 'getMethod',
  initialState: {
    getMethodData: {},
    getMethodStatus: 'idle',
  },
  reducers: {
    clearDataGet: state => {
      state.getMethodData = {};
      state.getMethodStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMethod.pending, (state, action) => {
        state.getMethodStatus = 'loading';
      })
      .addCase(getMethod.fulfilled, (state, action) => {
        state.getMethodStatus = 'succeeded';
        state.getMethodData = action.payload; // Gán dữ liệu người dùng từ action.payload
      })
      .addCase(getMethod.rejected, (state, action) => {
        state.getMethodStatus = 'failed';
        state.getMethodData = action.payload; // In ra lỗi từ action.payload
      });
  },
});

export const {clearDataGet} = methodSlice.actions;
export default methodSlice.reducer;
